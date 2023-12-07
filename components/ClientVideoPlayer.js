"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductList from "./ProductList";
import { useVideo } from "@/context/VideoContext";

const ClientVideoPlayer = ({ products }) => {
  const [videoSrc, setVideoSrc] = useState("");
  const [height, setHeight] = useState(0);
  const { setVideoLoaded } = useVideo();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setHeight(window.innerHeight);
    setVideoSrc(
      isMobile ? "/videos/mobile-compressed.mp4" : "/videos/desktop.mp4"
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1); // delay of 100ms, adjust as needed
  }, []);

  return (
    <>
      {/* <motion.video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-screen object-cover"
        initial={{ y: 0 }}
        animate={{
          y: -height,
          transition: {
            delay: 7,
            duration: 1.4,
            ease: [0.85, 0, 0.15, 1],
          },
        }}
        onAnimationComplete={() => setVideoLoaded(true)}
      />

      <motion.div
        className="w-full h-screen"
        initial={{ y: 0 }}
        animate={{
          y: -height,
          transition: {
            delay: 7,
            duration: 1.4,
            ease: [0.85, 0, 0.15, 1],
          },
        }}
      >
        <ProductList products={products} />
      </motion.div> */}
      <ProductList products={products} />
    </>
  );
};

export default ClientVideoPlayer;
