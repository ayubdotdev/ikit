"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, Video, FileText, Upload } from "lucide-react";
import { useNotification } from "./Notification";
import { apiclient } from "@/lib/api-client";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";  
import { motion } from "framer-motion";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiclient.createVideo(data);
      showNotification("Video published successfully!", "success");
      router.push("/");

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }

  };

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 glass border border-white/10 rounded-2xl p-8 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div>
        <label className="block font-medium mb-2 text-white flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Title</span>
        </label>
        <input
          type="text"
          className={`w-full px-4 py-3 border rounded-lg bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400 ${
            errors.title ? "border-red-500" : "border-white/20"
          }`}
          placeholder="Enter video title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <span>⚠</span>
            <span>{errors.title.message}</span>
          </span>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2 text-white flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Description</span>
        </label>
        <textarea
          className={`w-full px-4 py-3 border rounded-lg bg-black/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-400 h-24 resize-none ${
            errors.description ? "border-red-500" : "border-white/20"
          }`}
          placeholder="Describe your video..."
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-red-400 text-sm mt-1 flex items-center space-x-1">
            <span>⚠</span>
            <span>{errors.description.message}</span>
          </span>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2 text-white flex items-center space-x-2">
          <Video className="w-4 h-4" />
          <span>Upload Video</span>
        </label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-gray-800 rounded-full h-2 mt-3">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading || !uploadProgress}
        whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Publishing Video...</span>
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            <span>Publish Video</span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
}