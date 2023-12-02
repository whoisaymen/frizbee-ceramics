"use client";
import { createContext, useState, useEffect } from "react";
import { createCheckout, updateCheckout } from "@/lib/shopify";

const CartContext = createContext();

function sortProducts(products, option) {
  if (option === "color") {
    return [...products].sort((a, b) => {
      const colorA =
        a.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
        "";
      const colorB =
        b.node.tags.find((tag) => tag.startsWith("color:"))?.split(":")[1] ||
        "";
      return colorA.localeCompare(colorB);
    });
  }
  if (option === "shape") {
    return [...products].sort((a, b) => {
      const shapeA =
        a.node.tags.find((tag) => tag.startsWith("shape:"))?.split(":")[1] ||
        "";
      const shapeB =
        b.node.tags.find((tag) => tag.startsWith("shape:"))?.split(":")[1] ||
        "";
      return shapeA.localeCompare(shapeB);
    });
  }
  if (option === "pattern") {
    return [...products].sort((a, b) => {
      const patternA =
        a.node.tags.find((tag) => tag.startsWith("pattern:"))?.split(":")[1] ||
        "";
      const patternB =
        b.node.tags.find((tag) => tag.startsWith("pattern:"))?.split(":")[1] ||
        "";
      return patternA.localeCompare(patternB);
    });
  }

  if (option === "set") {
    const filteredProducts = [...products].filter((product) => {
      return product.node.tags.includes("set");
    });
    return filteredProducts;
  }
  if (option === "new") {
    // Filter products with the 'new' tag
    return products.filter((product) => product.node.tags.includes("new"));
  }

  if (option === "date") {
    // Sort products by date added, from newest to oldest
    return [...products].sort((a, b) => {
      const dateA = new Date(a.node.createdAt);
      const dateB = new Date(b.node.createdAt);
      return dateB - dateA; // Sorting in descending order
    });
  }

  return products; // return products as-is if there's no sorting
}

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [cartLoading, setCartLoading] = useState(false);
  const [sortOption, setSortOption] = useState("date"); // New state for sort option
  const [itemUpdated, setItemUpdated] = useState(false);

  useEffect(() => {
    let timer;
    if (itemUpdated) {
      timer = setTimeout(() => {
        setCartOpen(false);
        setItemUpdated(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [itemUpdated]);

  useEffect(() => {
    if (localStorage.checkout_id) {
      const cartObject = JSON.parse(localStorage.checkout_id);

      if (cartObject[0].id) {
        setCart([cartObject[0]]);
      } else if (cartObject[0].length > 0) {
        setCart(...[cartObject[0]]);
      }

      setCheckoutId(cartObject[1].id);
      setCheckoutUrl(cartObject[1].webUrl);
    }
  }, []);

  async function addToCart(addedItem) {
    const newItem = { ...addedItem };
    setCartOpen(true);

    if (cart.length === 0) {
      setCart([newItem]);

      const checkout = await createCheckout(
        newItem.id,
        newItem.variantQuantity
      );

      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]));
    } else {
      let newCart = [...cart];
      let itemExists = false;

      newCart = newCart.map((item) => {
        if (item.id === newItem.id) {
          itemExists = true;
          return {
            ...item,
            variantQuantity: item.variantQuantity + newItem.variantQuantity,
          };
        }
        return item;
      });

      if (!itemExists) {
        newCart.push(newItem);
      }

      setCart(newCart);
      const newCheckout = await updateCheckout(checkoutId, newCart);

      localStorage.setItem(
        "checkout_id",
        JSON.stringify([newCart, newCheckout])
      );
    }
    setItemUpdated(true);
  }

  async function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove);
    setCartLoading(true);

    setCart(updatedCart);

    const newCheckout = await updateCheckout(checkoutId, updatedCart);

    localStorage.setItem(
      "checkout_id",
      JSON.stringify([updatedCart, newCheckout])
    );
    setCartLoading(false);

    if (cart.length === 1) {
      setCartOpen(false);
    }
    // setItemUpdated(true);
  }

  async function incrementCartItem(item) {
    setCartLoading(true);

    let newCart = [];

    cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.variantQuantity++;
        newCart = [...cart];
      }
    });
    setCart(newCart);
    const newCheckout = await updateCheckout(checkoutId, newCart);

    localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]));
    setCartLoading(false);
    // setItemUpdated(true);
  }

  async function decrementCartItem(item) {
    setCartLoading(true);

    if (item.variantQuantity === 1) {
      removeCartItem(item.id);
    } else {
      let newCart = [];
      cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.variantQuantity--;
          newCart = [...cart];
        }
      });

      setCart(newCart);
      const newCheckout = await updateCheckout(checkoutId, newCart);

      localStorage.setItem(
        "checkout_id",
        JSON.stringify([newCart, newCheckout])
      );
    }
    setCartLoading(false);
    // setItemUpdated(true);
  }

  async function clearCart() {
    const updatedCart = [];

    setCart(updatedCart);

    const newCheckout = await updateCheckout(checkoutId, updatedCart);

    localStorage.setItem(
      "checkout_id",
      JSON.stringify([updatedCart, newCheckout])
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        checkoutUrl,
        removeCartItem,
        clearCart,
        cartLoading,
        incrementCartItem,
        decrementCartItem,
        sortOption, // New state export
        setSortOption, // New function export
        sortProducts, // New function export
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext };
