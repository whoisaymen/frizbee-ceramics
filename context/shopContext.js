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

    console.log('🛒 Adding item to cart:', newItem)
    console.log('📋 Current cart:', cart)
    console.log('🆔 Current checkoutId:', checkoutId)

    try {
      if (cart.length === 0) {
        console.log('📦 Creating new checkout (empty cart)')
        setCart([newItem])

        const checkout = await createCheckout(
          newItem.id,
          newItem.variantQuantity
        )

        console.log('✅ Created checkout:', checkout)

        setCheckoutId(checkout.id)
        setCheckoutUrl(checkout.webUrl || checkout.checkoutUrl)

        localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))
      } else {
        console.log('🔄 Updating existing checkout')
        let newCart = [...cart]
        let itemExists = false

        newCart = newCart.map((item) => {
          if (item.id === newItem.id) {
            itemExists = true
            console.log('📈 Incrementing existing item quantity')
            return {
              ...item,
              variantQuantity: item.variantQuantity + newItem.variantQuantity,
            }
          }
          return item
        })

        if (!itemExists) {
          console.log('➕ Adding new item to cart')
          newCart.push(newItem)
        }

        console.log('🛍️ New cart contents:', newCart)

        setCart(newCart)

        console.log('🔄 Calling updateCheckout with:', { checkoutId, newCart })

        const newCheckout = await updateCheckout(checkoutId, newCart)

        console.log('✅ Update checkout response:', newCheckout)

        const newCheckoutUrl =
          newCheckout.webUrl || newCheckout.checkoutUrl || checkoutUrl
        setCheckoutUrl(newCheckoutUrl)

        localStorage.setItem(
          'checkout_id',
          JSON.stringify([
            newCart,
            {
              id: checkoutId,
              webUrl: newCheckoutUrl,
              checkoutUrl: newCheckoutUrl,
            },
          ])
        )
      }
      console.log('🎉 Successfully added item to cart')
    } catch (error) {
      console.error('❌ Error adding to cart:', error)
      console.error('❌ Error message:', error.message)
      console.error('❌ Error stack:', error.stack)

      // More user-friendly error handling
      if (cart.length > 0) {
        // Try to recreate the checkout instead of showing error
        console.log('🔄 Attempting to recreate checkout...')
        try {
          // Clear the old checkout and create a new one
          const newCartWithItem = [...cart, newItem]

          // Check if item already exists and merge quantities
          const mergedCart = newCartWithItem.reduce((acc, item) => {
            const existingItem = acc.find((accItem) => accItem.id === item.id)
            if (existingItem) {
              existingItem.variantQuantity += item.variantQuantity
            } else {
              acc.push({ ...item })
            }
            return acc
          }, [])

          // Create fresh checkout with all items
          const checkout = await createCheckout(
            mergedCart[0].id,
            mergedCart[0].variantQuantity,
            mergedCart.slice(1)
          )

          setCart(mergedCart)
          setCheckoutId(checkout.id)
          setCheckoutUrl(checkout.webUrl || checkout.checkoutUrl)
          localStorage.setItem(
            'checkout_id',
            JSON.stringify([mergedCart, checkout])
          )

          console.log('✅ Successfully recreated checkout')
        } catch (recreateError) {
          console.error('❌ Failed to recreate checkout:', recreateError)
          // Only show error if recreation also fails
          alert('Unable to add item to cart. Please try refreshing the page.')
        }
      } else {
        // Reset cart state only if it was empty
        setCart([])
        setCheckoutId('')
        setCheckoutUrl('')
        localStorage.removeItem('checkout_id')
        alert('Unable to add item to cart. Please try again.')
      }
    }
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
