"use client";

import { AuroraBackground } from "../components/ui/aurora-background";
import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <AuroraBackground className="text-white">

    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
    </AuroraBackground>

  );
}