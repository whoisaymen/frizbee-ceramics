"use client";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'

import ProfessionalsForm from "@/components/professionals-form";
const images = [
    "/images/professionals/img1.png",
    "/images/professionals/img2.png",
    "/images/professionals/img3.png",
    "/images/professionals/img4.png",
    "/images/professionals/img5.png",
    "/images/professionals/img6.png",
    "/images/professionals/img7.png",
    "/images/professionals/img8.png",
    "/images/professionals/img9.png",
    "/images/professionals/img10.png",
    "/images/professionals/img11.png",
    "/images/professionals/img12.png",
    "/images/professionals/img1.png",
    "/images/professionals/img2.png",
    "/images/professionals/img3.png",
    "/images/professionals/img4.png",
    "/images/professionals/img5.png",
    "/images/professionals/img6.png",
    "/images/professionals/img7.png",
    "/images/professionals/img8.png",
    "/images/professionals/img9.png",
    "/images/professionals/img10.png",
    "/images/professionals/img11.png",
    "/images/professionals/img12.png",
];
const tags = [
    { name : "@gomacosmica", location: "Lisbon, Portugal" },
    { name : "@ponthstore", location: "Brooklyn, Nyc" },
    { name : "@amykev", location: "Seoul, Korea" },
    { name : "@henridyn", location: "Brussels, Belgium" },
    { name : "@2323coffee", location: "Sheffield, UK" },
    { name : "@_8bit_textiledesign", location: "Taipei, Taiwan" },
    { name : "@thempresents", location: "Lisbon, Portugal" },
    { name : "@bouche.coffee", location: "Brussels, Belgium" },
    { name : "@annameerson", location: "Brussels, Belgium" },
    { name : "@anemia.lisbon", location: "Lisbon, Portugal" },
    { name : "@_fragile_", location: "Antwerp, Belgium" },
    { name : "@sophie.pagakalidou", location: "Athens, Greece" },
    { name : "@gomacosmica", location: "Lisbon, Portugal" },
    { name : "@ponthstore", location: "Brooklyn, Nyc" },
    { name : "@amykev", location: "Seoul, Korea" },
    { name : "@henridyn", location: "Brussels, Belgium" },
    { name : "@2323coffee", location: "Sheffield, UK" },
    { name : "@_8bit_textiledesign", location: "Taipei, Taiwan" },
    { name : "@thempresents", location: "Lisbon, Portugal" },
    { name : "@bouche.coffee", location: "Brussels, Belgium" },
    { name : "@annameerson", location: "Brussels, Belgium" },
    { name : "@anemia.lisbon", location: "Lisbon, Portugal" },
    { name : "@_fragile_", location: "Antwerp, Belgium" },
    { name : "@sophie.pagakalidou", location: "Athens, Greece" },
]

export default function AboutPage() {
    const searchParams = useSearchParams()
    const search = (searchParams.get('category')?.toUpperCase()) || 'OTHERS';
    let category = search;
    if(search === 'OTHERS') category = 'OTHER';
    if(search === 'ARCHITECTS') category = 'INTERIOR DESIGNER';

    return (
        <main className="min-h-screen lg:pt-[10em] pt-[9em] flex flex-col items-center justify-end py-2 bg-white">
            <div className="w-full max-w-xl mx-auto px-2 md:px-0">
                <h2 className="text-xl uppercase font-bold text-center mb-0 md:mb-2">Professionals</h2>
                <ProfessionalsForm category={category} />

                <div className="my-8 text-center">
                    <p className="text-md font-bold">↓ FRIZBEE CERAMICS IN THE WORLD ↓</p>
                </div>
            </div>
            <div className="w-full overflow-hidden h-1/2 mb-2">
                <ul className="flex animate-carousel-long gap-0">
                    {images.map((image, index) => (
                        <li
                            key={`${image}-${index + 1}`}
                            className="relative h-[30vh] md:h-[60vh] max-h-[530px] w-2/3 max-w-[500px] flex-none md:w-2/3 lg:w-1/3"
                        >
                            <div className="relative h-full w-full">
                                <div className="group flex h-full w-full items-center justify-center overflow-hidden relative border-t border-black border-r">
                                    <Image
                                        src={image}
                                        alt={"Image " + (index + 1)}
                                        layout="fill"
                                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 10vh"
                                        className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 h-12 w-full flex items-center justify-between px-4 text-white text-[8.5px] md:text-sm font-light uppercase">
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 md:w-4 md:h-4 bg-black inline-block mr-2 rounded-full"></span>
                                        <span>{tags[index].name}</span>
                                    </div>
                                    <p>{tags[index].location}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
