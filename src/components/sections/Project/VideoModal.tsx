"use client";
import { ScrollSmoother } from "@/lib/gsap";
import { IconMaximize, IconMinimize, IconX } from "@tabler/icons-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface VideoModalProps {
  videoKey: string | null;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoKey, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(onClose, 250);
  }, [onClose]);

  const toggleFullscreen = useCallback(() => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Lock background scroll and pause ScrollSmoother when modal is open
  useEffect(() => {
    if (!videoKey) {
      setIsOpen(false);
      return;
    }

    const animTimer = requestAnimationFrame(() => setIsOpen(true));
    let smoother: any = null;
    try {
      smoother = ScrollSmoother.get();
      if (smoother) smoother.paused(true);
    } catch {}

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      try {
        if (smoother) smoother.paused(false);
      } catch {}
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [videoKey, handleClose]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!mounted || !videoKey) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-99999 flex items-center justify-center bg-black/70 backdrop-blur-[20px] p-4 md:p-10 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black transition-all duration-300 ease-out transform ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header controls  */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-linear-to-b from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-white font-montserrat font-medium text-sm md:text-base">
            Project Showcase
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <IconMinimize className="size-5" />
              ) : (
                <IconMaximize className="size-5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full cursor-pointer"
              title="Close"
            >
              <IconX className="size-5" />
            </button>
          </div>
        </div>

        <video
          ref={videoRef}
          src={videoKey}
          autoPlay
          controls
          className="w-full h-full object-contain"
          onEnded={handleClose}
        />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default React.memo(VideoModal);
