
"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiclient } from "@/lib/api-client";
import Header from "./components/Header";
import { motion } from "framer-motion";
import { AuroraBackground } from "./components/ui/aurora-background";


export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiclient.getVideos();
        setVideos(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <AuroraBackground className="px-4 py-8">
    <main className="w-full mx-auto ">
        <motion.h1
      className=" text-center text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      Welcome to ImageKit Reels,
      Share and Enjoy!
    </motion.h1>
      <Header />
      <VideoFeed videos={videos} />
    </main>
      </AuroraBackground>
  );
}
