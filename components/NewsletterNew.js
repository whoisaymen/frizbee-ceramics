"use client";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
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
        className={`flex lg:hidden text-sm font-light tracking-wide fixed left-[10px] z-[9] px-3 py-1 text-black transition-[bottom] duration-500 ease-in-out rounded-t-lg rounded-b-none border-black border bg-[#FFA500] ${
          newsletterOpen ? "bottom-[calc(570px)]" : "bottom-[24px]"
        }`}
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
      {newsletterOpen && (
        <div className="relative z-50 overflow-hidden ">
          <div className="absolute inset-0 ">
            <div className="fixed right-0 bottom-[24px] lg:bottom-[10%] w-full lg:max-w-[calc(40%+1px)] h-[75vh] border-red-500 border-2 lg:h-auto ">
              <div className="w-full border-black lg:border-l border-t border-b rounded-t-none lg:rounded-l-lg h-[75vh] lg:overflow-hidden lg:rounded-r-none">
                <div className="flex flex-col justify-end overflow-y-scroll bg-white lg:rounded-t-lg  lg:rounded-l-lg lg:rounded-r-none shadow-xl relative h-full">
                  <button
                    type="button"
                    className="p-1 -m-2 text-black hover:text-white outline-none absolute right-2 top-3 z-[10000]"
                    onClick={() => setNewsletterOpen(false)}
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 mt-0 -m-[1px]">
                    <div className="relative lg:border-r border-black md:w-full h-[300px] md:h-auto">
                      <Image
                        src={"/images/newsletter2.jpeg"}
                        alt={""}
                        className="object-cover h-full"
                        width={1000}
                        height={1000}
                      />
                    </div>
                    <div className="flex flex-col justify-between lg:mb-0">
                      <div className="h-1/2">
                        <h3 className="tracking-tighter font-extralight uppercase m-2 text-lg">
                          News
                        </h3>
                        <ul className="text-sm font-extralight tracking-tighter list-disc p-2 pt-0 -mt-1">
                          <li>
                            The studio is now located in Portugal, Barrosinha.
                            Feel free to visit to see what we&apos;re up to.
                          </li>
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
                            <p className="text-sm font-extralight tracking-tighter leading-snug p-2 pt-0 -mt-1 mb-6 md:mb-0">
                              Sign up for our newsletter here.
                            </p>
                          </div>

                          <form onSubmit={handleSubmit}>
                            <label htmlFor="email-address" className="sr-only">
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
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
