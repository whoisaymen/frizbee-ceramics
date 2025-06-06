"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/public/images/logo-min.png";

const TempNav = () => {
    const [isInfoHovered, setIsInfoHovered] = useState(false);
    const [activeTab, setActiveTab] = useState(null);

    const handleMouseEnter = () => {
        setIsInfoHovered(true);
    };
    const handleMouseLeave = () => {
        setIsInfoHovered(false);
    };

    const selectSubsection = (slug) => () => {
        if (slug) {
            setActiveTab(slug);
        }
    };

    return (
        <>
        <div className="fixed top-0 left-0 right-0 z-10 font-light tracking-tight uppercase mx-auto mt-4 list-none flex items-center  h-[10vh]">
            <header className="relative mb-4 left-2 sm:left-12 z-[999]">
                <div className="bg-transparent w-full h-[10vh] md:h-0 -mb-[9.5vh] md:-mb-0"></div>
                <nav aria-label="Top" className="mx-auto flex">
                    <li
                        className={`tracking-[-1.2px] mr-4 custom-cursor text-black border-black border hover:-rotate-3 transition duration-200 ease-out font-light bg-white/90 relative`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="w-full px-4">Info</div>
                        {isInfoHovered && aboutSubmenu({ selectSubsection })}
                    </li>
                </nav>
            </header>
            
            <Link
                href="/"
                className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-6 custom-cursor mt-2"
            >
                <span className="sr-only">Frizbee Ceramics</span>
                <div className="h-16 lg:h-[5.4rem] w-auto">
                <Image
                    src={logo}
                    alt="Frizbee Ceramics logo"
                    priority
                    className="object-contain w-full h-full"
                />
                </div>
            </Link>
            <div className="w-full">
            </div>
        </div>
        {/* activeTab */}
        <div className="w-full h-full mt-20 text-white">
                <div className="mt-20">
                    <div className="space-y-4 left-2 sm:left-12 absolute top-[16vh]">
                        {activeTab === "contact" && <Contact />}
                        {activeTab === "events" && <Events />}
                    </div>
                </div>
            </div>
        </>
    );
};

const SUBMENU = [
    {
        info: [
            { slug: "contact", title: "Contact" },
            // { slug: "events", title: "Upcoming Events" }, //removed for now
        ],
    },
];

const aboutSubmenu = ({ selectSubsection }) => (
    <div className="absolute -rotate-2 transition duration-200 ease-out top-full left-0 z-[600] bg-[#fbfbff] border border-t-0 border-black w-[180px] -mt-0 -mr-[1px]">
        <ul className="list-none p-0 m-0 text-right">
            {SUBMENU[0].info.map((subsection, index) => (
                <li key={subsection.title} className="p-[0.1rem] px-1 py-0">
                    <div onClick={selectSubsection(subsection.slug)}>
                        <span className="block text-black no-underline text-left" style={(index === 0 ? { borderBottom: "1px solid black" } : {})}>
                            {subsection.title}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const Contact = () => {
    return (
        <>
            <h4 className="uppercase font-bold">Contact</h4>
            <p className="text-sm">
                <span className="font-semibold mb-1 inline-block">Customer support:</span>
                <br />
                <Link
                    href="mailto:hey@frizbeeceramics.com"
                    className="border-b border-gray-700 tracking-tighter mr-6"
                >
                    hey@frizbeeceramics.com
                </Link>
            </p>
            <p className="text-sm">
                <span className="font-semibold mb-1 inline-block">Wholesale: </span>
                <br />
                <Link
                    href="mailto:go@frizbeeceramics.com"
                    className="border-b border-gray-700 tracking-tighter mr-6"
                >
                    go@frizbeeceramics.com
                </Link>
            </p>
        </>
    );
};

const Events = () => {
    return (
        <>
            <h4 className="font-bold uppercase">Upcoming Events</h4>
            <div className="text-sm tracking-normal capitalize leading-6">
                <p>Paris: 07/12 - 08/12 - Lafayette Anticipations</p>
                <p>Lisbon: 07/12 - Ele Ela Café</p>
                <p>Brussels: 14/12 - Bouche Café</p>
            </div>
        </>
    );
};

export default TempNav;
