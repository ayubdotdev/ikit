"use client";

import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "@/models/Video";
import { motion } from "framer-motion";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
    >
      <div className="relative">
        <Link href={`/videos/${video._id}`} className="block relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
            
          </motion.div>
        </Link>
      </div>

      <div className="p-4">
        <Link href={'/videos'}>
          <motion.h2
            whileHover={{ color: "#a855f7" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-purple-400 transition-colors"
          >
            {video.title}
          </motion.h2>
        </Link>

        <p className="text-sm text-gray-400 line-clamp-2 mb-3">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}
