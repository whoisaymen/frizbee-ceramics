'use client'
import { createContext, useState, useEffect } from 'react'
import {
  createCheckout,
  getProduct,
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
  const [quantityErrors, setQuantityErrors] = useState({})

  function setQuantityError(itemId, message) {
    setQuantityErrors((prev) => ({
      ...prev,
      [itemId]: message,
    }))
  }

  useEffect(() => {
    async function initializeCart() {
      if (localStorage.checkout_id) {
        try {
          const cartObject = JSON.parse(localStorage.checkout_id)

          // Validate checkout if it exists
          if (cartObject[1] && cartObject[1].id) {
            const isValidCheckout = await validateCheckoutUrl(cartObject[1].id)

            if (isValidCheckout.valid) {
              setCart(cartObject[0])
              setCheckoutId(cartObject[1].id)
              setCheckoutUrl(cartObject[1].checkoutUrl || cartObject[1].webUrl)
            } else {
              // Clear invalid cart from localStorage
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

    const handle = newItem.handle
    const variantId = newItem.id

    let quantityAvailable = null
    let isAvailableForSale = false;

    try {
      const product = await getProduct(handle)
      const variant = product.variants.edges.find(
        (v) => v.node.id === variantId
      )
      quantityAvailable = variant?.node?.quantityAvailable ?? 0
      isAvailableForSale = variant.node.availableForSale;

    } catch (err) {
      console.error('⚠️ Failed to fetch product inventory:', err)
      alert('Unable to validate stock. Please try again.')
      return
    }

    const existingItem = cart.find((item) => item.id === newItem.id)
    const currentQty = existingItem?.variantQuantity || 0
    const totalQty = currentQty + newItem.variantQuantity

    if (!isAvailableForSale) {
      alert("This item is currently unavailable.");
      return;
    }
    if (quantityAvailable > 0 && totalQty > quantityAvailable) {
      alert(`Only ${quantityAvailable} of this item available in stock.`);
      return;
    }

    try {
      if (cart.length === 0) {
        const newCart = [newItem]
        setCart(newCart)
        const checkout = await createCheckout(newCart)
        setCheckoutId(checkout.id)
        setCheckoutUrl(checkout.checkoutUrl)
        localStorage.setItem('checkout_id', JSON.stringify([newCart, checkout]))
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
        const newCheckoutUrl = newCheckout?.checkoutUrl || checkoutUrl
        setCheckoutUrl(newCheckoutUrl)

        localStorage.setItem(
          'checkout_id',
          JSON.stringify([newCart, newCheckout])
        )
      }
    } catch (error) {
      console.error('❌ Error in addToCart:', error)
      alert('Failed to add to cart. Please try again.')
    }
  }

  async function removeCartItem(itemToRemove) {
    setCartLoading(true)

    const updatedCart = cart.filter((item) => item.id !== itemToRemove)
    setCart(updatedCart)

    try {
      if (updatedCart.length === 0) {
        // Cart is empty, clear everything
        setCheckoutId('')
        setCheckoutUrl('')
        localStorage.removeItem('checkout_id')
        setCartOpen(false)
      } else {
        // Update checkout with remaining items
        const newCheckout = await updateCheckout(checkoutId, updatedCart)

        if (newCheckout === null) {
          // This shouldn't happen since we checked length > 0, but just in case
          setCheckoutId('')
          setCheckoutUrl('')
          localStorage.removeItem('checkout_id')
          setCartOpen(false)
        } else {
          // Update with new checkout
          setCheckoutId(newCheckout.id)
          setCheckoutUrl(newCheckout.webUrl || newCheckout.checkoutUrl)
          localStorage.setItem(
            'checkout_id',
            JSON.stringify([updatedCart, newCheckout])
          )
        }
      }
    } catch (error) {
      console.error('❌ Error removing item from cart:', error)
      // Revert cart state on error
      setCart(cart)
      alert('Unable to remove item from cart. Please try again.')
    }

    setCartLoading(false)

    // Close cart if it becomes empty
    if (updatedCart.length === 0) {
      setCartOpen(false)
    }
  }

  async function incrementCartItem(item) {
    setCartLoading(true)

    let quantityAvailable = 0
    try {
      const product = await getProduct(item.handle)
      const variant = product.variants.edges.find((v) => v.node.id === item.id)
      quantityAvailable = variant?.node?.quantityAvailable ?? 0
    } catch (err) {
      console.error('Failed to fetch live inventory:', err)
      setQuantityError(item.id, 'Could not verify stock. Please try again.')
      setTimeout(() => setQuantityError(item.id, null), 3000)
      setCartLoading(false)
      return
    }

    // Only block if there's actual stock AND we've reached the limit
    if (quantityAvailable > 0 && item.variantQuantity >= quantityAvailable) {
      setQuantityError(item.id, `Only ${quantityAvailable} in stock`);
      setTimeout(() => setQuantityError(item.id, null), 3000);
      setCartLoading(false);
      return;
    }

    const newCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          variantQuantity: cartItem.variantQuantity + 1,
        }
      }
      return cartItem
    })

    setCart(newCart)

    try {
      const newCheckout = await updateCheckout(checkoutId, newCart)

      if (newCheckout) {
        setCheckoutId(newCheckout.id)
        setCheckoutUrl(newCheckout.webUrl || newCheckout.checkoutUrl)
        localStorage.setItem(
          'checkout_id',
          JSON.stringify([newCart, newCheckout])
        )
      }
    } catch (error) {
      console.error('❌ Error incrementing item:', error)

      // Revert the cart change
      setCart(cart)

      // Check if it's a quantity limit error
      if (error.message.includes('You can only add')) {
        // Extract the limit from the error message
        const match = error.message.match(/You can only add (\d+)/)
        const limit = match ? match[1] : 'the maximum'

        // Set an error state for this specific item
        setQuantityError(item.id, `Maximum ${limit} allowed`)

        // Clear the error after 3 seconds
        setTimeout(() => {
          setQuantityError(item.id, null)
        }, 3000)
      } else {
        setQuantityError(item.id, 'Unable to update cart. Please try again.')
        setTimeout(() => setQuantityError(item.id, null), 3000)
      }
    }

    setCartLoading(false)
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
        quantityErrors,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }
