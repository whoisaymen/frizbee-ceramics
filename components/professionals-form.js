"use client";

import { useState } from "react";

export default function CatalogueForm({ category }) {
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        category: category,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

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

        setIsSubmitted(true);
    };

    return (
        <div className="w-full">
            <h2 className="text-center mb-6 font-medium w-full">
                Please fill in the information below. We&apos;ll send you the latest catalogue.
            </h2>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4  max-w-sm mx-auto">
                    <input type="hidden" name="category" />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="FIRST NAME"
                        value={formState.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded text-center text-sm placeholder:text-gray-400"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="LAST NAME"
                        value={formState.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded text-center text-sm placeholder:text-gray-400"
                    />

                    <input
                        type="text"
                        name="companyName"
                        placeholder="COMPANY NAME"
                        value={formState.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded text-center text-sm placeholder:text-gray-400"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded text-center text-sm placeholder:text-gray-400"
                    />

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#AAAAEF] hover:bg-[#9c9ce8] transition-colors rounded text-center text-sm"
                    >
                        SUBMIT
                    </button>
                </form>
            ) : (
                <div className="bg-indigo-200 py-4 rounded text-center">
                    <p className="font-medium">Thank you!</p>
                    <p className="text-sm">We&apos;ll be in touch soon.</p>
                </div>
            )}
        </div>
    );
}
