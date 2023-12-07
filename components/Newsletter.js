"use client";
import { Fragment, useContext, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

export default function Newsletter() {
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("idle"); // "idle", "subscribed", "alreadyExists", "error"

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target["email-address"].value;

    const response = await fetch("/api/newsletter-signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setSubscriptionStatus("subscribed");
    } else if (response.status === 409) {
      // Assuming 409 status code for existing email
      setSubscriptionStatus("alreadyExists");
    } else {
      console.error("Subscription failed:", response);
      setSubscriptionStatus("error");
    }
  };

  const renderMessage = () => {
    switch (subscriptionStatus) {
      case "subscribed":
        return (
          <div>
            <h3 className="font-semibold">Thank you for subscribing!</h3>
            <p className="font-light">{`We've added your email to our newsletter list.`}</p>
          </div>
        );
      case "alreadyExists":
        return (
          <div>
            <h3 className="font-semibold">Email Already Subscribed</h3>
            <p className="font-light">
              This email is already on our newsletter list.
            </p>
          </div>
        );
      case "error":
        return (
          <div>
            <h3 className="font-semibold">Subscription Error</h3>
            <p className="font-light">
              There was a problem subscribing. Please try again later.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <>
      <button
        className={`flex lg:hidden text-sm font-light tracking-wide fixed left-[10px] bottom-[24px] z-[9] px-3 py-1 text-black transition-[bottom] duration-500 ease-in-out rounded-t-lg rounded-b-none border-black border bg-[#FFA500] ${
          newsletterOpen ? "bottom-[calc(75vh)]" : "bottom-[24px]"
        }}`}
        onClick={() => setNewsletterOpen(!newsletterOpen)}
      >
        NEWS
      </button>
      <div
        className={`hidden lg:flex text-sm font-light lg:text-base fixed bottom-[9rem] z-[2000] ${
          newsletterOpen ? "right-[40%]" : "right-0"
        } transition-[right] duration-500 ease-in-out 
          ${newsletterOpen ? "right-[40%]" : "right-0"}`}
      >
        <button
          className={`flex flex-col border items-center border-black border-r-0 rounded-l-md p-0 bg-[#FFA500]`}
          onClick={() => setNewsletterOpen(!newsletterOpen)}
        >
          <span className="px-1 pt-1">N</span>
          <span className="px-1 -mt-[8px]">E</span>
          <span className="px-1 -mt-[8px]">W</span>
          <span className="px-1 -mt-[8px] pb-1">S</span>
        </button>
        {/* <span className=" bg-black text-white ">X</span> */}
      </div>

      <div></div>
      <Transition.Root show={newsletterOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 overflow-hidden"
          onClose={() => {
            setNewsletterOpen(!newsletterOpen);
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
              className={`fixed right-0 bottom-[24px] lg:bottom-[10%]
               flex w-full lg:max-w-[calc(40%+1px)] h-[30vh] lg:h-[40vh]`}
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
                <div className="w-full border-black lg:border-l border-t border-b rounded-l-lg">
                  <div className="flex flex-col overflow-y-scroll bg-white rounded-l-lg shadow-xl relative h-full">
                    <button
                      type="button"
                      className="p-1 -m-2 text-black hover:bg-white hover:text-black outline-none absolute right-2 top-3 z-[10000]"
                      onClick={() => setNewsletterOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    {/* <div className="flex-1 overflow-y-auto sm:px-0">
                      <div className="border-black">
                        <div className="flow-root"></div>
                      </div>
                    </div> */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen mt-0 -m-[1px]">
                      <div className="relative border-r border-black">
                        <Image
                          src={"/images/newsletter2.jpeg"}
                          alt={""}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="h-1/2">
                          <h3 className="tracking-tighter font-extralight uppercase m-2 text-lg">
                            News
                          </h3>
                          <ul className="text-sm font-extralight tracking-tighter list-disc p-2 pt-0 -mt-1">
                            <li>
                              Diswasher safe handmade porcelain objects Now
                              available @smets_store Bxl
                            </li>
                            <li>Xmas drop - 07/12 11am CEST</li>
                            <li>Xmas sale - 18/12 @bouche.coffee Bxl</li>
                          </ul>
                        </div>

                        {subscriptionStatus !== "idle" ? (
                          <div className="bg-[#D6FD53] border-t border-black text-sm tracking-tighter p-2 py-10">
                            {renderMessage()}
                          </div>
                        ) : (
                          <>
                            <div>
                              <h3 className="tracking-tighter font-extralight uppercase m-2 text-lg">
                                Newsletter
                              </h3>
                              <p className="text-sm font-extralight tracking-tighter leading-snug p-2 pt-0 -mt-1 ">
                                Sign up for our newsletter and take 10% off your
                                first Ceramics purchase.
                              </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                              <label
                                htmlFor="email-address"
                                className="sr-only"
                              >
                                Email address
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email-address"
                                autoComplete="email"
                                required
                                className="min-w-0 text-sm font-light appearance-none border-t border-b border-l-0 border-black border-t-gray-400 bg-white px-3 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 w-full uppercase"
                                placeholder="Enter your email"
                              />
                              <div className="mt-0 flex-shrink-0">
                                <button
                                  type="submit"
                                  className="flex w-full items-center justify-center bg-black px-3 py-2 text-sm text-white shadow-sm hover:bg-[#FFA500] hover:text-black uppercase"
                                >
                                  Subscribe
                                </button>
                              </div>
                            </form>
                          </>
                        )}
                      </div>
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
