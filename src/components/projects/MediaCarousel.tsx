"use client";

import { useState } from "react";

export default function MediaCarousel({ screenshots = [], video = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

 const isVideo = (src?: string) =>
  typeof src === "string" && src.endsWith(".mp4");

  const media = [
    ...(video ? [video] : []),
    ...screenshots
  ];
  if (media.length === 0) {
  return (
    <div className="w-full h-[400px] rounded-xl border border-white/10 flex items-center justify-center text-white/40">
      No media available
    </div>
  );
}

  return (
    <>
      {/* MAIN DISPLAY */}
      <div
        className="relative w-full h-[400px] rounded-xl overflow-hidden border border-white/10 cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        {isVideo(media?.[activeIndex]) ? (
          <video
            src={media[activeIndex]}
            className="w-full h-full object-cover"
            controls
          />
        ) : (
          <img
            src={media[activeIndex]}
            className="w-full h-full object-cover"
            alt=""
          />
        )}

        {/* LEFT ARROW */}
        {media.length > 1 && (
          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((prev) =>
                prev === 0 ? media.length - 1 : prev - 1
              );
            }}
          >
            ‹
          </button>
        )}

        {/* RIGHT ARROW */}
        {media.length > 1 && (
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((prev) =>
                prev === media.length - 1 ? 0 : prev + 1
              );
            }}
          >
            ›
          </button>
        )}
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 flex gap-4 overflow-x-auto">
        {media.map((src, i) => (
          <div
            key={i}
            className={`w-24 h-24 rounded-lg border cursor-pointer ${
              i === activeIndex
                ? "border-white"
                : "border-white/20"
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {isVideo(src) ? (
              <video src={src} className="w-full h-full object-cover" />
            ) : (
              <img src={src} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          {isVideo(media[activeIndex]) ? (
            <video
              src={media[activeIndex]}
              className="max-w-[90%] max-h-[80%]"
              controls
            />
          ) : (
            <img
              src={media[activeIndex]}
              className="max-w-[90%] max-h-[80%]"
              alt=""
            />
          )}
        </div>
      )}
    </>
  );
}
