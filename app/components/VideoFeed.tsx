import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface VideoFeedProps {
  videos: IVideo[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="space-y-8">
        {/* Preview Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Discover Amazing Content
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get a glimpse of what's waiting for you. Sign up to watch full videos and share your own!
          </p>
        </motion.div>

        {/* Video Grid with Overlay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.slice(0, 8).map((video, index) => (
            <motion.div
              key={video._id?.toString()}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
            
              
              <div className="mt-3 space-y-2">
                <h3 className="text-white font-medium text-sm line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
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