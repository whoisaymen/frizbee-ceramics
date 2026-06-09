'use client'
import { useEffect, useRef, useState } from 'react'

export default function InfoPage() {
    const [textVisible, setTextVisible] = useState(false)
    const videoRef = useRef(null)
    const sectionRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return
            const { top } = sectionRef.current.getBoundingClientRect()
            if (top <= -80) {
                setTextVisible(true)
                videoRef.current?.pause()
            } else {
                setTextVisible(false)
                videoRef.current?.play().catch(() => { })
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section
            ref={sectionRef}
            className="bg-[url('/images/about/frizbee_factory.jpg')] bg-cover bg-center min-h-[100vh]"
        >
            {/* ── DESKTOP (unchanged) ── */}
            <div className="group hidden lg:block absolute top-0 left-[50%] translate-x-[-50%] h-full z-0">
                <video autoPlay loop muted className="max-h-[100vh] group-hover:blur-md transition duration-300 ease-in-out">
                    <source src="/videos/FRIZ_final.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="text-wrapper group-hover:opacity-100 text-black opacity-0 absolute top-0 text-sm px-12 mt-8 sm:mt-40 transition duration-300 ease-in-out font-bold">
                    <p className="mb-2">
                        FRIZBEE CERAMICS offers a high-end handcrafted porcelain tableware
                        collection.
                    </p>
                    <p className="mb-2">
                        The brand&apos;s cups, bowls, plates, planters and homeware often include
                        nostalgic visuals like aliens and distorted smileys. Each item is
                        casted using premium-quality porcelain and glazed by hand. While
                        unique in design the collection remains true to FRIZBEE CERAMICS&apos;
                        core philosophy of durability and functionality. FRIZBEE CERAMICS
                        adds a youthful charm and zest to modern kitchen and homeware with
                        its evocative and offbeat designs.
                    </p>
                    <p className="mb-2">
                        Currently the brand is presented at over 40 stores/cafés, and in
                        more than 15 countries. Since the launch, FRIZBEE CERAMICS has
                        worked in a variety of contexts. Through collaborations, exhibitions
                        and performances with fashion brands, museums, art galleries and
                        artists.
                    </p>
                    <p className="mb-2">
                        Frizbee Ceramics&apos; line ranges from tiny shot glasses to large
                        serving dishes and is 100% dishwasher safe!
                    </p>
                    <p>
                        Please reach out for special requests, studio visits and custom
                        orders at <span>go@frizbeeceramics.com</span>.
                    </p>
                </div>
            </div>

            {/* ── MOBILE ── */}
            <div className="lg:hidden h-[200vh]">
                <div className="sticky top-0 h-screen overflow-hidden">

                    {/* Fullscreen video */}
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${textVisible ? 'blur-md scale-105' : 'blur-none scale-100'
                            }`}
                    >
                        <source src="/videos/FRIZ_final.mp4" type="video/mp4" />
                    </video>

                    {/* Text panel — slides up from bottom in one go */}
                    <div
                        className={`absolute inset-0 bg-transparent flex flex-col justify-center px-8 py-20 overflow-y-auto transition-transform duration-500 ease-out ${textVisible ? 'translate-y-0' : 'translate-y-full'
                            }`}
                    >
                        <div className="text-black text-[11px] font-bold mt-8">
                            <p className="mb-2">
                                FRIZBEE CERAMICS offers a high-end handcrafted porcelain tableware
                                collection.
                            </p>
                            <p className="mb-2">
                                The brand&apos;s cups, bowls, plates, planters and homeware often include
                                nostalgic visuals like aliens and distorted smileys. Each item is
                                casted using premium-quality porcelain and glazed by hand. While
                                unique in design the collection remains true to FRIZBEE CERAMICS&apos;
                                core philosophy of durability and functionality. FRIZBEE CERAMICS
                                adds a youthful charm and zest to modern kitchen and homeware with
                                its evocative and offbeat designs.
                            </p>
                            <p className="mb-2">
                                Currently the brand is presented at over 40 stores/cafés, and in
                                more than 15 countries. Since the launch, FRIZBEE CERAMICS has
                                worked in a variety of contexts. Through collaborations, exhibitions
                                and performances with fashion brands, museums, art galleries and
                                artists.
                            </p>
                            <p className="mb-2">
                                Frizbee Ceramics&apos; line ranges from tiny shot glasses to large
                                serving dishes and is 100% dishwasher safe!
                            </p>
                            <p className="mb-2">
                                Please reach out for special requests, studio visits and custom
                                orders at <span>go@frizbeeceramics.com</span>.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
