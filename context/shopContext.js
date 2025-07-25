'use client'
import { createContext, useState, useEffect } from 'react'
import {
  createCheckout,
  updateCheckout,
  validateCheckoutUrl,
} from '@/lib/shopify'

const CartContext = createContext()

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [cartLoading, setCartLoading] = useState(false)
  const [itemUpdated, setItemUpdated] = useState(false)

  // useEffect(() => {
  //   let timer;
  //   if (itemUpdated) {
  //     timer = setTimeout(() => {
  //       setCartOpen(false);
  //       setItemUpdated(false);
  //     }, 1000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [itemUpdated]);

  useEffect(() => {
    async function initializeCart() {
      if (localStorage.checkout_id) {
        try {
          const cartObject = JSON.parse(localStorage.checkout_id)

          // Validate checkout if it exists
          if (cartObject[1] && cartObject[1].id) {
            const isValidCheckout = await validateCheckoutUrl(cartObject[1].id)

            if (isValidCheckout.valid) {
              if (cartObject[0].id) {
                setCart([cartObject[0]])
              } else if (cartObject[0].length > 0) {
                setCart(...[cartObject[0]])
              }

              setCheckoutId(cartObject[1].id)
              setCheckoutUrl(cartObject[1].webUrl)
            } else {
              // Clear invalid checkout from localStorage
              localStorage.removeItem('checkout_id')
              setCart([])
              setCheckoutId('')
              setCheckoutUrl('')
            }
          }
        } catch (error) {
          console.error('Error initializing cart:', error)
          localStorage.removeItem('checkout_id')
          setCart([])
          setCheckoutId('')
          setCheckoutUrl('')
        }
      }
    }

    initializeCart()
  }, [])

  async function addToCart(addedItem) {
    const newItem = { ...addedItem }
    setCartOpen(true)

    try {
      if (cart.length === 0) {
        setCart([newItem])

        const checkout = await createCheckout(
          newItem.id,
          newItem.variantQuantity
        )

        setCheckoutId(checkout.id)
        setCheckoutUrl(checkout.webUrl)

        localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))
      } else {
        let newCart = [...cart]
        let itemExists = false

        newCart = newCart.map((item) => {
          if (item.id === newItem.id) {
            itemExists = true
            return {
              ...item,
              variantQuantity: item.variantQuantity + newItem.variantQuantity,
            }
          }
          return item
        })

        if (!itemExists) {
          newCart.push(newItem)
        }

        setCart(newCart)
        const newCheckout = await updateCheckout(checkoutId, newCart)

        localStorage.setItem(
          'checkout_id',
          JSON.stringify([newCart, newCheckout])
        )
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Reset cart state on error
      setCart([])
      setCheckoutId('')
      setCheckoutUrl('')
      localStorage.removeItem('checkout_id')
      alert(
        'There was an error adding the item to your cart. Please try again.'
      )
    }
    // setItemUpdated(true);
  }

  async function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove)
    setCartLoading(true)

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem(
      'checkout_id',
      JSON.stringify([updatedCart, newCheckout])
    )
    setCartLoading(false)

    if (cart.length === 1) {
      setCartOpen(false)
    }
    // setItemUpdated(true);
  }

  async function incrementCartItem(item) {
    setCartLoading(true)

    let newCart = []

    cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.variantQuantity++
        newCart = [...cart]
      }
    })
    setCart(newCart)
    const newCheckout = await updateCheckout(checkoutId, newCart)

    localStorage.setItem('checkout_id', JSON.stringify([newCart, newCheckout]))
    setCartLoading(false)
    // setItemUpdated(true);
  }

  async function decrementCartItem(item) {
    setCartLoading(true)

    if (item.variantQuantity === 1) {
      removeCartItem(item.id)
    } else {
      let newCart = []
      cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.variantQuantity--
          newCart = [...cart]
        }
      })

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)

      localStorage.setItem(
        'checkout_id',
        JSON.stringify([newCart, newCheckout])
      )
    }
    setCartLoading(false)
    // setItemUpdated(true);
  }

  async function clearCart() {
    const updatedCart = []

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem(
      'checkout_id',
      JSON.stringify([updatedCart, newCheckout])
    )
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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }
