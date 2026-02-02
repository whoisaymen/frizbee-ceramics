
"use client"

import CountdownTimer from "../../components/ui/CountdownTimer";
import TempNav from "./TempNav";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Deals = () => {
    const [subscriptionStatus, setSubscriptionStatus] = useState("idle");
    const router = useRouter();

    const handleCountdownComplete = () => {
        // console.log("Countdown completed in parent");
        router.replace("/");
        // router.refresh();
        // Reload the page after a short delay to allow the URL change to happen
        setTimeout(() => {
            window.location.reload();
        }, 100); // Small delay (100ms) to ensure the redirect has been processed before reloading

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
        } else if (response.status === 422) {
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
        <>
            <TempNav />
            <div className="flex flex-col items-center justify-end md:justify-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-full">
                {/* <h4 className="sm:text-md sm:font-regular uppercase">{`YES, WE NEED ONE EXTRA DAY ::)`}</h4> */}
                <h2 className="sm:text-xl sm:font-semibold uppercase">MYSTERY BOX</h2>
                {/* <div className="text-center">
                    <h2 className="sm:text-xl sm:font-semibold">Up to 40% off</h2>
                    <h2 className="sm:text-xl sm:font-semibold uppercase">Drop</h2>
                </div> */}

                <CountdownTimer onComplete={handleCountdownComplete} />

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-[18rem] w-full">
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email-address"
                        autoComplete="email"
                        required
                        className="min-w-0 text-sm font-light appearance-none border border-gray-800  bg-white px-3 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 w-full placeholder:uppercase"
                        placeholder="Enter your email"
                    />
                    <div className="mt-0 flex-shrink-0">
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center bg-[#AAAAEF] px-3 py-2 text-sm shadow-sm hover:bg-[#8d8dcc] text-black uppercase outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {subscriptionStatus !== "idle" && (
                    <div className="bg-[#AAAAEF] mt-4 text-black border-t border-gray-800 text-sm tracking-tighter p-2 w-full max-w-[18rem]">
                        {renderMessage()}
                    </div>
                )}
            </div>
        </>
    )
}

export default Deals