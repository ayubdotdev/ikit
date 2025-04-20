import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <motion.div 
        className="text-center py-12 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Welcome to ImageKit Reels
        </h2>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">
          Join our community to watch amazing videos and share your own content with the world!
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <motion.button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </Link>
          <Link href="/register">
            <motion.button
              className="px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Account
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}

      {videos.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
}