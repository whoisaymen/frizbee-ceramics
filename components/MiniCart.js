"use client";
import { Fragment, useContext, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { formatter } from "../utils/helpers";
import { CartContext } from "@/context/shopContext";
import useHeaderHeight from "@/hooks/useHeaderHeight";

export default function MiniCart({ cart }) {
  const cancelButtonRef = useRef();
  const {
    cartOpen,
    setCartOpen,
    checkoutUrl,
    removeCartItem,
    clearCart,
    cartLoading,
    incrementCartItem,
    decrementCartItem,
  } = useContext(CartContext);

  let cartTotal = 0;
  cart.map((item) => {
    cartTotal += item?.variantPrice * item?.variantQuantity;
  });

  const cartQuantity = cart.reduce(
    (acc, item) => acc + item?.variantQuantity,
    0
  );

  const headerHeight = useHeaderHeight();

  const isMobile = window.innerWidth <= 768; // Define mobile screen width, adjust as needed
  const cartWidth = "25%"; // Adjust based on your cart's width
  const cartButtonStyle = cartOpen
    ? {
        position: "fixed",
        right: cartWidth, // Move button to the left by the width of the cart
        top: isMobile ? "6rem" : "1rem",
        zIndex: 2000, // Ensure it's above other content
        transition: "right 0.47s ease-in-out",
        marginRight: "-1px",
        display: isMobile ? "none" : "flex",
      }
    : {
        position: "fixed",
        right: "0px",
        top: isMobile ? "6rem" : "1rem",
        zIndex: 2000,
        transition: "right 0.5s ease-in-out",
        display: "flex",
      };

  return (
    <>
      <div className="text-sm font-light lg:text-base" style={cartButtonStyle}>
        <button
          className={`flex flex-col border items-center border-black border-r-0 rounded-l-md ${
            cartQuantity > 0 ? "bg-[#F7D949]" : "bg-white/95"
          } p-0`}
          onClick={() => setCartOpen(true)}
        >
          <span className="px-1 pt-1">C</span>
          <span className="px-1 -mt-[8px]">A</span>
          <span className="px-1 -mt-[8px]">R</span>
          <span className="px-1 -mt-[8px]">T</span>
          <span className="px-1 pb-1">({cartQuantity})</span>
        </button>
      </div>
      <Transition.Root show={cartOpen} as={Fragment}>
        <Dialog
          initialFocus={cancelButtonRef}
          as="div"
          className="relative z-50 overflow-hidden"
          onClose={() => {
            setCartOpen(!cartOpen);
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 transition-opacity" />
            </Transition.Child>

            <div
              className={`fixed inset-y-0 right-0 md:top-0 flex w-full md:max-w-[34%] lg:max-w-[calc(25%+1px)] items-end md:items-start`}
              // style={{ top: `${headerHeight}px` }}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-[0.5s]"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-[0.6s]"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-full border-black lg:border-l border-t mt-4">
                  <div className="flex flex-col h-[calc(100vh-46px)] overflow-y-scroll bg-white shadow-xl relative">
                    <button
                      ref={cancelButtonRef}
                      type="button"
                      className="p-1 -m-2 text-black hover:bg-white hover:text-black outline-none absolute right-2 top-3 z-[10000]"
                      onClick={() => setCartOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                    {/* <div className="flex items-stretch justify-end overflow-y-auto border-black">
                      <div className="bg-[#F7D949] w-auto p-1 px-3 border-r border-black border-b border-l border-t">
                        <Dialog.Title className="font-light uppercase bg-[#F7D949] text-gray-900 text-sm tracking-tighter">
                          Your cart ({cartQuantity})
                        </Dialog.Title>
                      </div>

                      <div className="flex items-center p-2">
                        <button
                          ref={cancelButtonRef}
                          type="button"
                          className="p-1 -m-2 text-black hover:bg-white hover:text-black outline-none"
                          onClick={() => setCartOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div> */}

                    <div className="flex-1 overflow-y-auto sm:px-0">
                      <div className="border-black">
                        <div className="flow-root">
                          {cart.length > 0 ? (
                            <ul
                              role="list"
                              className="divide-y-0 divide-gray-400"
                            >
                              {cart.map((product) => (
                                <li
                                  key={product.id + Math.random()}
                                  className="relative flex"
                                >
                                  <div
                                    className={`top-0 left-0 right-0 z-50 w-full object-cover absolute ${
                                      cartLoading
                                        ? "bg-white opacity-60"
                                        : "hidden"
                                    }`}
                                  ></div>
                                  <div className="relative flex-shrink-0 w-[33%] h-[15vh] overflow-hidden border-gray-400 border-r-[1px]">
                                    <Image
                                      src={product.image}
                                      alt={product.title}
                                      width={500}
                                      height={500}
                                      priority
                                      className="object-cover object-center"
                                      style={{
                                        maxWidth: "100%",
                                        height: "100%",
                                      }}
                                    />
                                  </div>

                                  <div className="flex flex-col flex-1 ml-4 justify-center w-1/2">
                                    <div className="flex justify-between text-sm font-light text-gray-900 tracking-tighter leading-[18px] mb-4">
                                      <h3>
                                        <Link
                                          href={`/products/${product.handle}`}
                                          passHref
                                        >
                                          <span
                                            onClick={() => setCartOpen(false)}
                                          >
                                            {product.title}
                                          </span>
                                        </Link>
                                      </h3>
                                    </div>

                                    <div className="flex justify-between items-center text-sm tracking-tighter font-light">
                                      <div
                                        className={`border border-black h-10 flex items-center justify-center`}
                                      >
                                        <button
                                          className="px-2 "
                                          onClick={() =>
                                            decrementCartItem(product)
                                          }
                                          disabled={cartLoading}
                                        >
                                          -
                                        </button>
                                        <span className="px-2 border-black border-l border-r self-stretch">
                                          {product.variantQuantity}
                                        </span>
                                        <button
                                          className="px-2"
                                          onClick={() =>
                                            incrementCartItem(product)
                                          }
                                          disabled={cartLoading}
                                        >
                                          +
                                        </button>
                                        <button
                                          onClick={() =>
                                            removeCartItem(product.id)
                                          }
                                          type="button"
                                          className="border-black border-l tracking-tighter px-2 py-1 self-stretch"
                                          disabled={cartLoading}
                                        >
                                          Remove
                                        </button>
                                      </div>

                                      <p className="ml-4 mr-4">
                                        {formatter.format(product.variantPrice)}
                                      </p>
                                    </div>

                                    {/* <div className="flex items-center justify-between flex-1 text-sm p-6"> */}
                                    {/* <p className="text-gray-500">Qty {product.variantQuantity}</p> */}
                                    {/* <div className={`border`}>
                                      <button
                                        className="px-2"
                                        onClick={() =>
                                          decrementCartItem(product)
                                        }
                                        disabled={cartLoading}
                                      >
                                        -
                                      </button>
                                      <span className="px-2 border-l border-r">
                                        {product.variantQuantity}
                                      </span>
                                      <button
                                        className="px-2"
                                        onClick={() =>
                                          incrementCartItem(product)
                                        }
                                        disabled={cartLoading}
                                      >
                                        +
                                      </button>
                                    </div> */}
                                    {/* <div className="flex">
                                      <button
                                        onClick={() =>
                                          removeCartItem(product.id)
                                        }
                                        type="button"
                                        className="font-medium text-gray-500 hover:text-gray-600"
                                        disabled={cartLoading}
                                      >
                                        Remove
                                      </button>
                                    </div> */}
                                    {/* </div> */}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div>
                              <p className="p-4 text-lg tracking-tighter font-light">
                                There&apos;s nothing in your cart.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {cart.length > 0 ? (
                      <div className="px-4 py-4 border-t border-black sm:px-6">
                        <div className="flex justify-between uppercase font-medium text-black text-sm tracking-tighter">
                          <p>Subtotal</p>
                          <p>{formatter.format(cartTotal)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 tracking-tight">
                          Shipping and taxes calculated at checkout.
                        </p>

                        {/* <div className='flex justify-center mt-4 text-sm text-center text-gray-500'>
												<p>
													<button onClick={() => clearCart()} className='font-medium hover:text-gray-800'>
														Clear Cart
													</button>{' '}
													or{' '}
													<button type='button' className='font-medium hover:text-gray-800' onClick={() => setCartOpen(false)}>
														Continue Shopping<span aria-hidden='true'> &rarr;</span>
													</button>
												</p>
											</div> */}
                      </div>
                    ) : null}
                    <div className="mt-0">
                      <a
                        href={checkoutUrl}
                        className={`h-[60px] uppercase tracking-tight flex items-center justify-center px-6 py-1 text-sm font-medium text-white bg-black border border-transparent shadow-sm hover:bg-gray-800 ${
                          cartLoading ? "cursor-not-allowed" : ""
                        }`}
                      >
                        Proceed to payment
                      </a>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
