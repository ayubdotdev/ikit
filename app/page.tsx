"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiclient } from "@/lib/api-client";
import Header from "./components/Header";
import { motion } from "framer-motion";
import { Play, Upload, Heart } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Vortex } from "@/app/components/ui/vortex";
import { BackgroundParticles } from "@/app/components/ui/background-particles";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const { data: session } = useSession();

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
    <div className="min-h-screen bg-black">
      <Header />
      
      {!session ? (
        <>
          {/* Vortex only on larger devices */}
          <div className="hidden md:block">
            <Vortex
              className="flex items-center justify-center flex-col"
              containerClassName="min-h-screen"
              backgroundColor="black"
            >
              <section className="relative pt-24 pb-16 overflow-hidden">
                <div className="relative z-10 container mx-auto px-6">  
                  <motion.div
                    className="text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <motion.h1
                      className="text-5xl md:text-7xl font-bold mb-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      <span className="font-bebas-neue bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mt-10">
                        VORTEX
                      </span>
                    </motion.h1>
                    
                    <motion.p
                      className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      Share and discover amazing videos
                    </motion.p>
                    
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    >
                      <Link href="/login">
                        <motion.button
                          className="bg-gradient-to-r from-purple-400 to-pink-400  text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-3"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          
                          <span>Get Started</span>
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </section>
            </Vortex>
          </div>

          {/* Regular content for small devices */}
          <div className="md:hidden">
            <section className="relative pt-24 pb-16 overflow-hidden">
              <div className="relative z-10 container mx-auto px-6">  
                <motion.div
                  className="text-center max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <span className="font-bebas-neue bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent ">
                      VORTEX
                    </span>
                  </motion.h1>
                  
                  <motion.p
                    className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    Share and discover amazing videos
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    <Link href="/login">
                      <motion.button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-3"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        
                        <span>Get Started</span>
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </section>
          </div>

          {/* Feature Cards - visible on all devices */}
          <section className="py-20 bg-transparent">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Upload</h3>
                  <p className="text-gray-400 text-sm">Share your videos with the world</p>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Watch</h3>
                  <p className="text-gray-400 text-sm">Discover amazing content</p>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Enjoy</h3>
                  <p className="text-gray-400 text-sm">Enjoy the video</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer - visible on all devices */}
          <footer className="py-12 border-t border-white/10">
            <div className="container mx-auto px-6 text-center">
              <div className="text-gray-400 text-sm">
                <p>© 2024 VORTEX. All rights reserved.</p>
                
                </div>
              </div>
          </footer>
        </>
      ) : (
        // Direct to videos for logged in users
        <>
          <BackgroundParticles 
            particleCount={30}
            particleColor="#8b5cf6"
            particleSize={1.5}
            speed={0.3}
          />
          <section className="pt-24 pb-20 relative z-10">
            <div className="container mx-auto px-6">
              <VideoFeed videos={videos} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
