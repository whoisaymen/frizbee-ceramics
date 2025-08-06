"use client";
import { useState, useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import newsletterImage from "@/public/images/newsletter2.jpeg";
import Image from "next/image";
import { CartContext } from "@/context/shopContext";
import Link from "next/link";
import { formatter } from "@/utils/helpers";

export default function Cart() {
  const {
    cart,
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

  return (
    <div
      className={`z-10 fixed bottom-0 right-0 lg:bottom-auto lg:top-[1rem]  w-full transform transition-transform duration-500 ease-in-out min-w-[400px] lg:max-w-[calc(30%+1px)] lg:flex ${
        cartOpen
          ? "translate-y-0"
          : "translate-y-[calc(100%-54px)] md:translate-y-[calc(100%-58px)] lg:translate-y-0 lg:translate-x-[calc(100%-27px)]"
      }`}
    >
      <button
        className="z-10 relative px-3 md:h-[28px] py-1 text-black transition-[bottom] duration-500 ease-in-out  uppercase rounded-t-lg rounded-b-none border-gray-800 border border-b-0 bg-[#fbf234] text-sm font-light tracking-wide mb-[24px] md:mb-[28px] ml-[calc(100vw-95px)] lg:hidden"
        onClick={() => setCartOpen(!cartOpen)}
      >
        CART({cartQuantity})
        <span className="bg-[#fbf234] absolute left-0 -bottom-[1px] h-[1px] inline-block w-full -mt-[0.5px]"></span>
      </button>

      <button
        className="hidden lg:flex z-10 lg:flex-col border lg:items-center border-black border-r-0 -mr-[1px] rounded-l-md p-0 bg-[#fbf234] text-base lg:self-start font-light tracking-wide"
        onClick={() => setCartOpen(!cartOpen)}
      >
        <span className="px-1 pt-1">C</span>
        <span className="px-1 -mt-[8px]">A</span>
        <span className="px-1 -mt-[8px]">R</span>
        <span className="px-1 -mt-[8px]">T</span>
        <span className="px-1 pb-1">({cartQuantity})</span>
      </button>
      <button
        className="p-1 -m-2 text-black hover:text-black outline-none absolute right-2 top-10 lg:top-2 z-[10000]"
        onClick={() => setCartOpen(false)}
      >
        <span className="sr-only">Close panel</span>
        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
      </button>

      <div className=" h-[75vh] lg:h-[calc(100vh-46px)] w-full">
        <div
          className={`h-full transform transition ease-in-out duration-500 translate-y-0 bg-white  border-t border-black lg:border-l w-full -mt-[24px] md:-mt-[28px] mb-[24px] lg:m-0 lg:flex overflow-y-scroll flex flex-col lg:items-start`}
        >
          <div className="flex-1 overflow-y-auto sm:px-0">
            <div className="border-black">
              <div className="flow-root">
                {cart.length > 0 ? (
                  <ul role="list" className="divide-y-0 divide-gray-400">
                    {cart.map((product) => (
                      <li
                        key={product.id + Math.random()}
                        className="relative flex"
                      >
                        <div
                          className={`top-0 left-0 right-0 z-50 w-full object-cover absolute ${
                            cartLoading ? "bg-white opacity-60" : "hidden"
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
                                <span onClick={() => setCartOpen(false)}>
                                  {product.title}
                                </span>
                              </Link>
                            </h3>
                          </div>

                          <div className="flex justify-between items-stretch text-sm tracking-tighter font-light">
                            <div className="border border-black flex items-center justify-center">
                              <button
                                className="px-3 text-xl font-extralight h-full"
                                onClick={() => decrementCartItem(product)}
                                disabled={cartLoading}
                              >
                                -
                              </button>
                              <span className="px-2 border-black border-l border-r flex items-center h-full">
                                {product.variantQuantity}
                              </span>
                              <button
                                className="px-3 text-xl font-extralight h-full border-black border-r"
                                onClick={() => incrementCartItem(product)}
                                disabled={cartLoading}
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeCartItem(product.id)}
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
                                product.variantPrice * product.variantQuantity
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="h-full w-screen">
                    <p className="p-4 text-sm md:text-lg tracking-tighter font-light">
                      There&apos;s nothing in your cart.
                    </p>
                    <div className="h-screen bg-[#4019A9]/10 blur-xl mt-32 -mb-10 w-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {cart.length > 0 ? (
            <div className="flex flex-col w-full">
              <div className="px-8 py-6 border-t border-black sm:px-10 lg:w-full">
                <ul className="list-disc text-sm">
                  <li>Complimentary 4-5 days shipping (EU & UK)</li>
                  <li>Customs fees apply outside EU</li>
                  <li>14 days free return and exchange</li>
                </ul>
              </div>
              <div className="px-4 py-4 border-t border-black sm:px-6 lg:w-full">
                <div className="flex justify-between uppercase font-medium text-black text-sm tracking-tighter">
                  <p>Subtotal</p>
                  <p>{formatter.format(cartTotal)}</p>
                </div>
                <p className="mt-0.5 text-xs font-light text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            </div>
          ) : null}
          <div className="mt-0 pb-6 lg:pb-0 lg:w-full">
            <Link
              href={checkoutUrl}
              className={`uppercase tracking-tight flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-[#000] border border-transparent shadow-sm hover:bg-[#fbf234] hover:text-black hover:border-t hover:border-l-0 hover:border-r-0 hover:border-t-black  ${
                cartLoading ? "cursor-not-allowed" : ""
              }`}
            >
              {cartQuantity > 0 ? "Proceed to Payment" : "Continue Shopping"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
