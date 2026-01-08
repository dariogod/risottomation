"use client";

interface VideoSectionProps {
  videoUrl?: string;
  videoId?: string; // For YouTube/Vimeo
  platform?: "youtube" | "vimeo" | "direct";
}

export default function VideoSection({ 
  videoUrl, 
  videoId, 
  platform = "youtube" 
}: VideoSectionProps) {
  const getEmbedUrl = () => {
    if (videoUrl) return videoUrl;
    if (platform === "youtube" && videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (platform === "vimeo" && videoId) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  return (
    <section id="video" className="relative w-full py-12 md:py-20 bg-[#faf0d8]">
      <div className="max-w-6xl mx-auto px-4">
        {embedUrl ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Risottomation Video"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl bg-[#ffd159] flex items-center justify-center">
            <p className="text-[#4d0629] text-lg">Video will be embedded here</p>
          </div>
        )}
      </div>
    </section>
  );
}

