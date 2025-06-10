"use client";

import VideoUploadForm from "../components/VideoUploadForm";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { Upload, Sparkles } from "lucide-react";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                VORTEX
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center space-x-3">
              <Upload className="w-8 h-8" />
              <span>Upload New Video</span>
            </h1>
            <p className="text-gray-400">Share your amazing content with the world</p>
          </motion.div>
          
          <VideoUploadForm />
        </motion.div>
      </div>
    </div>
  );
}