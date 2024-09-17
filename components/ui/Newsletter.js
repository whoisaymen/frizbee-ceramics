"use client";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import newsletterImage from "@/public/images/newsletter2.jpeg";
import newsletterImage from "@/public/images/newsletter-latest.jpg";
import Image from "next/image";

export default function Newsletter() {
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setNewsletterOpen(true);
    }, 10000);
  }, []);
  const [subscriptionStatus, setSubscriptionStatus] = useState("idle");

  const toggleNewsletter = () => {
    setNewsletterOpen(!newsletterOpen);
  };

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

  return (
    <div
      className={`z-10 fixed inline-block bottom-0 left-0 lg:left-auto lg:right-0 lg:bottom-[5rem] transform transition-transform duration-500 ease-in-out lg:flex lg:max-w-[calc(40%+1px)] ${
        newsletterOpen
          ? "translate-y-0"
          : "translate-y-[calc(100%-29px)] md:translate-y-[calc(100%-28px)] lg:translate-y-0 lg:translate-x-[calc(100%-24px)]"
      }`}
    >
      <button
        className="z-10 relative bottom-[24px] md:bottom-[28px] px-3 md:h-[28px] py-1 text-black transition-[bottom] duration-500 ease-in-out  uppercase rounded-t-lg rounded-b-none border-gray-800 border border-b-0 bg-[#FFA500]  text-sm font-light tracking-wide ml-[10px] lg:hidden"
        onClick={toggleNewsletter}
      >
        News
        <span className="bg-[#FFA500] absolute left-0 -bottom-[1px] h-[1px] inline-block w-full -mt-[0.5px]"></span>
      </button>

      <button
        className="hidden lg:flex z-10 lg:flex-col border lg:items-center border-black border-r-0 rounded-l-md p-0 bg-[#FFA500] text-base lg:self-end font-light tracking-wide mb-[4rem]"
        onClick={toggleNewsletter}
      >
        <span className="px-1 pt-1">N</span>
        <span className="px-1 -mt-[8px]">E</span>
        <span className="px-1 -mt-[8px]">W</span>
        <span className="px-1 -mt-[8px] pb-1">S</span>
      </button>
      <div className="-mt-[24px]">
        <button
          className="p-1 -m-2 text-black hover:text-black outline-none absolute right-2 top-4 lg:-top-3 z-[10000]"
          onClick={toggleNewsletter}
        >
          <span className="sr-only">Close panel</span>
          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
        </button>

        <div
          className={`transform transition ease-in-out duration-500 translate-y-0 bg-white h-auto w-screen md:-mt-[28px] mb-[24px] md:mb-[28px] lg:m-0 lg:flex lg:rounded-l-lg lg:min-h-[300px] lg:w-full`}
        >
          <div className="relative h-[20vh] lg:h-auto lg:w-1/2">
            <Image
              src={newsletterImage}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              placeholder="blur"
              alt={"Newsletter image"}
              className="object-cover border-gray-800 border-t lg:border lg:rounded-l-lg"
            />
          </div>

          <div className="h-auto lg:w-1/2 lg:flex lg:justify-between lg:flex-col lg:border-t border-black lg:border-b">
            <div>
              <h3 className="tracking-tighter font-extralight uppercase m-2 text-lg">
                News
              </h3>
              <ul className="text-sm font-extralight tracking-tighter p-2 pt-0 -mt-1 list-none">
                <li>
                Come see us / Barcelona Coffee Awards / October the 18th, 19th and 20th.
                </li>
              </ul>
            </div>
            <div>
              {subscriptionStatus !== "idle" ? (
                <div className="bg-[#D6FD53] border-t border-gray-800 text-sm tracking-tighter p-2 py-10">
                  {renderMessage()}
                </div>
              ) : (
                <>
                  <h3 className="tracking-tighter font-extralight uppercase m-2 text-lg">
                    Newsletter
                  </h3>
                  <p className="text-sm font-extralight tracking-tighter leading-snug p-2 pt-0 -mt-1 mb-6 md:mb-0">
                    Sign up for our newsletter here.
                  </p>

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
                      className="min-w-0 text-sm font-light appearance-none border-t border-b border-l-0 border-gray-800 border-t-gray-400 bg-white px-3 py-1.5 text-gray-900 shadow-sm border-r-0  placeholder:text-gray-400 w-full uppercase"
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
    </div>
  );
}
