"use client";
import { Fragment, useContext, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { formatter } from "../utils/helpers";
import { CartContext } from "@/context/shopContext";
import useHeaderHeight from "@/hooks/useHeaderHeight";
import { useMediaQuery } from "react-responsive";

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

  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <>
      <button
        className={`flex lg:hidden text-sm font-light tracking-wide fixed right-[10px] z-[9] px-3 py-1 text-black transition-[bottom] duration-500 ease-in-out rounded-t-lg rounded-b-none border-black border ${
          cartOpen ? "bottom-[calc(75vh)]" : "bottom-[24px]"
        } ${cartQuantity > 0 ? "bg-[#fbf234]" : "bg-white"}`}
        onClick={() => setCartOpen(!cartOpen)}
      >
        CART({cartQuantity})
      </button>
      <div
        className={`hidden lg:flex text-sm font-light lg:text-base fixed top-[1rem] z-[2000] ${
          cartOpen ? "right-[25%]" : "right-0"
        } transition-[right] duration-500 ease-in-out 
          ${cartOpen ? "right-[25%]" : "right-0"}`}
      >
        <button
          className={`flex flex-col border items-center border-black border-r-0 rounded-l-md ${
            cartQuantity > 0 ? "bg-[#fbf234]" : "bg-white/95"
          } p-0`}
          onClick={() => setCartOpen(!cartOpen)}
        >
          <span className="px-1 pt-1">C</span>
          <span className="px-1 -mt-[8px]">A</span>
          <span className="px-1 -mt-[8px]">R</span>
          <span className="px-1 -mt-[8px]">T</span>
          <span className="px-1 pb-1">({cartQuantity})</span>
        </button>
      </div>

      <div></div>
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
              className={`fixed inset-y-0 border-red-500 border-3 right-0 lg:top-0 flex w-full lg:max-w-[calc(25%+1px)] items-end lg:items-start h-full`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom={isMobile ? "translate-y-full" : "translate-x-full"}
                enterTo="translate-x-0 translate-y-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0 translate-y-0"
                leaveTo={isMobile ? "translate-y-full" : "translate-x-full"}
              >
                <div className="w-full border-black md:border-l border-t mt-4">
                  <div className="flex flex-col h-[75vh] lg:h-[calc(100vh-46px)] overflow-y-scroll bg-white shadow-xl relative">
                    <button
                      ref={cancelButtonRef}
                      type="button"
                      className="p-1 -m-2 text-black hover:bg-white hover:text-black outline-none absolute right-2 top-3 z-[10000]"
                      onClick={() => setCartOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

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
                                  <div className="relative flex-shrink-0 w-[33%] h-[18vh] overflow-hidden border-gray-400 border-r-0">
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

                                    <div className="flex justify-between items-stretch text-sm tracking-tighter font-light">
                                      <div className="border border-black flex items-center justify-center">
                                        <button
                                          className="px-3 text-xl font-extralight h-full"
                                          onClick={() =>
                                            decrementCartItem(product)
                                          }
                                          disabled={cartLoading}
                                        >
                                          -
                                        </button>
                                        <span className="px-2 border-black border-l border-r flex items-center h-full">
                                          {product.variantQuantity}
                                        </span>
                                        <button
                                          className="px-3 text-xl font-extralight h-full border-black border-r"
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
                                          className="tracking-tighter px-2 py-1 flex items-center"
                                          disabled={cartLoading}
                                        >
                                          <Image
                                            src="/images/removeIcon.svg"
                                            priority
                                            alt="Remove"
                                            className="h-4 w-4"
                                            width={10}
                                            height={10}
                                          />
                                        </button>
                                      </div>

                                      <p className="ml-4 mr-4 self-center">
                                        {formatter.format(
                                          product.variantPrice *
                                            product.variantQuantity
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="h-full">
                              <p className="p-4 text-sm md:text-lg tracking-tighter font-light">
                                There&apos;s nothing in your cart.
                              </p>
                              <div className="h-screen bg-[#4019A9]/10 blur-xl mt-32 -mb-10"></div>
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
                        <p className="mt-0.5 text-xs font-light text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                      </div>
                    ) : null}
                    <div className="mt-0 pb-6 lg:pb-0">
                      <a
                        href={checkoutUrl}
                        className={`uppercase tracking-tight flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-[#000] border border-transparent shadow-sm hover:bg-[#fbf234] hover:text-black hover:border-t hover:border-l-0 hover:border-r-0 hover:border-black ${
                          cartLoading ? "cursor-not-allowed" : ""
                        }`}
                      >
                        {cartQuantity > 0
                          ? "Proceed to Payment"
                          : "Continue Shopping"}
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
