"use client";

import { useState } from "react";
import countries from "../countries.json";
import { inter } from "@/components/ui/Fonts";

export default function CatalogueForm({ category }) {
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        category: category,
        country: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/professionals/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formState }),
        });

        if (!response.ok) {
            setIsError(true);
            console.error("Form submission failed:", response.statusText);
        } else {
            setIsError(false);
        }

        setIsSubmitted(true);
    };

    return (
        <div className="w-full">
            <h2 className="text-center mb-2 md:mb-4 font-medium w-full">
                Please fill in the information below. We&apos;ll send you the latest
                catalogue.
            </h2>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-2 max-w-sm mx-auto">
                    <input type="hidden" name="category" />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="FIRST NAME"
                        value={formState.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300  text-center text-sm placeholder:text-gray-400"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="LAST NAME"
                        value={formState.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300  text-center text-sm placeholder:text-gray-400"
                    />

                    <input
                        type="text"
                        name="companyName"
                        placeholder="COMPANY NAME"
                        value={formState.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300  text-center text-sm placeholder:text-gray-400"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300  text-center text-sm placeholder:text-gray-400"
                    />

                    {/* <select
                        name="country"
                        className={`${inter.className} w-full px-4 py-2 border border-gray-300 text-center text-sm placeholder:text-gray-400`}
                    > */}
                    <select
                        name="country"
                        value={formState.country}
                        onChange={handleChange}
                        className={`${inter.className} w-full px-4 py-2 border border-gray-300 text-center text-sm placeholder:text-gray-400`}
                    >
                        <option value="">SELECT COUNTRY</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#AAAAEF] hover:bg-[#9c9ce8] transition-colors  text-center text-sm"
                    >
                        SUBMIT
                    </button>
                </form>
            ) : (
                (isError && (
                    <div className="bg-red-200 py-4 text-center">
                        <p className="font-medium">Error!</p>
                        <p className="text-sm">There was an error submitting your form.</p>
                        <span className="text-md font-bold underline" onClick={() => setIsSubmitted(false)}>Try again</span>
                    </div>
                )) ||
                (!isError && (
                    <div className="bg-indigo-200 py-4 text-center">
                        <p className="font-medium">Thank you!</p>
                        <p className="text-sm">We&apos;ll be in touch soon.</p>
                    </div>
                ))
            )}
        </div>
    );
}
