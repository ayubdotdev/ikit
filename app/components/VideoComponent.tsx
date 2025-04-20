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
    className="card border border-gray-600 bg-black text-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <figure className= " relative px-4 pt-4">
        <Link href={`/`} className="relative group w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-xl overflow-hidden relative w-full"
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
      </figure>

      <div className="  card-body p-4">
        <Link href={`/videos/${video._id}`}>
          <motion.h2
            whileHover={{  color: "#2563eb" }} // Slight scale & color shift on hover
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="card-title text-lg"
          >
            {video.title}
          </motion.h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}
