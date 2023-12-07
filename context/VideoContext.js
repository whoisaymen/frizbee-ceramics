"use client";
import { createContext, useState, useContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <VideoContext.Provider
      value={{ videoLoaded, setVideoLoaded, isAnimated, setIsAnimated }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
