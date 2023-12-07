"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoPlayer = ({ onVideoEnd }) => {
  // const [videoSrc, setVideoSrc] = useState("");
  const videoSrc = "/videos/mobile.mp4";
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (videoEnded) {
      onVideoEnd();
    }
  }, [videoEnded, onVideoEnd]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  // useEffect(() => {
  //   // Check window width to determine mobile or desktop video
  //   const isMobile = window.innerWidth <= 768;
  //   setVideoSrc(isMobile ? "/videos/mobile.mp4" : "/videos/desktop.mp4");
  // }, []);

  return (
    <AnimatePresence>
      <motion.video
        key="video"
        src={videoSrc}
        autoPlay
        onEnded={handleVideoEnd}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute w-full h-full"
      />
    </AnimatePresence>
  );
};

export default VideoPlayer;
