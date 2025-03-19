"use client";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'

import ProfessionalsForm from "@/components/professionals-form";
const images = [
    "/images/about/img1.jpg",
    "/images/about/img2.jpg",
    "/images/about/img3.jpg",
    "/images/about/img4.jpg",
];

export default function AboutPage() {
    const searchParams = useSearchParams()
    const search = (searchParams.get('category')?.toUpperCase()) || 'OTHERS';


    return (
        <main className="min-h-screen flex flex-col items-center justify-evenly px-4 py-2 bg-white">
            <div className="w-full max-w-xl mx-auto">
                <h2 className="text-xl font-bold text-center mb-2">{search}</h2>
                <ProfessionalsForm category={search}  />

                <div className="mt-8 text-center">
                    <p className="text-sm font-bold">↓ FRIZBEE IN THE WORLD ↓</p>
                </div>
            </div>
            <div className="w-[95%] mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 h-[35vh] absolute bottom-0">
                    <div className="w-full overflow-hidden">
                        <Image
                            src="/images/about/img1.jpg"
                            alt="Frizbee product"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-full overflow-hidden">
                        <Image
                            src="/images/about/img2.jpg"
                            alt="Frizbee product"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-full overflow-hidden">
                        <Image
                            src="/images/about/img3.jpg"
                            alt="Frizbee product"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-full overflow-hidden">
                        <Image
                            src="/images/about/img4.jpg"
                            alt="Frizbee product"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
