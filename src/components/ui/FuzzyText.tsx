"use client";
import React, { useEffect, useRef } from "react";

interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = "clamp(2rem, 6vw, 6rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrameId = 0;
    let isCancelled = false;
    let isVisible = false;
    let isHovering = false;
    let offscreen: HTMLCanvasElement | null = null;
    let offscreenWidth = 0;
    let tightHeight = 0;
    let fuzzRange = 30;
    let interactiveLeft = 0;
    let interactiveTop = 0;
    let interactiveRight = 0;
    let interactiveBottom = 0;

    const noiseOffsets = new Int8Array(256);
    let noiseCursor = 0;
    const refillNoise = () => {
      for (let i = 0; i < noiseOffsets.length; i++) {
        noiseOffsets[i] = Math.floor((Math.random() - 0.5) * 60);
      }
    };
    refillNoise();

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === "inherit"
          ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
          : fontFamily;

      const fontSizeStr =
        typeof fontSize === "number" ? `${fontSize}px` : fontSize;

      let numericFontSize: number;
      if (typeof fontSize === "number") {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement("span");
        temp.style.fontSize = fontSize;
        temp.style.position = "absolute";
        temp.style.visibility = "hidden";
        temp.style.pointerEvents = "none";
        document.body.appendChild(temp);
        numericFontSize = parseFloat(window.getComputedStyle(temp).fontSize);
        document.body.removeChild(temp);
      }

      const text = React.Children.toArray(children).join("");

      offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", { alpha: true });
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      const metrics = offCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent =
        metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10;
      offscreenWidth = textBoundingWidth + extraWidthBuffer;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      offscreen.width = offscreenWidth * dpr;
      offscreen.height = tightHeight * dpr;
      offCtx.scale(dpr, dpr);

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = color;
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      const horizontalMargin = 50;
      canvas.width = (offscreenWidth + horizontalMargin * 2) * dpr;
      canvas.height = tightHeight * dpr;
      canvas.style.width = `${offscreenWidth + horizontalMargin * 2}px`;
      canvas.style.height = `${tightHeight}px`;

      ctx.scale(dpr, dpr);
      ctx.translate(horizontalMargin, 0);
      ctx.imageSmoothingEnabled = false;

      interactiveLeft = horizontalMargin + xOffset;
      interactiveTop = 0;
      interactiveRight = interactiveLeft + textBoundingWidth;
      interactiveBottom = tightHeight;

      fuzzRange = Math.max(20, Math.min(40, tightHeight * 0.3));

      const totalRows = tightHeight;
      refillNoise();

      const step = prefersReduced ? 0 : 1;

      const run = () => {
        if (isCancelled || !offscreen || !isVisible) return;

        const intensity = isHovering ? hoverIntensity : baseIntensity;
        const maxOffset = Math.floor(intensity * fuzzRange);

        ctx.clearRect(
          -fuzzRange,
          -2,
          offscreenWidth + fuzzRange * 2,
          tightHeight + 4,
        );

        for (let j = 0; j < totalRows; j++) {
          if (noiseCursor >= noiseOffsets.length - 1) {
            refillNoise();
            noiseCursor = 0;
          }
          const noiseValue = noiseOffsets[noiseCursor++] / 60;
          const dx = Math.floor(noiseValue * maxOffset);
          ctx.drawImage(
            offscreen,
            0,
            j,
            offscreenWidth,
            1,
            dx,
            j,
            offscreenWidth,
            1,
          );
        }

        if (step) {
          animationFrameId = window.requestAnimationFrame(run);
        }
      };

      run();
    };

    const isInsideTextArea = (x: number, y: number) =>
      x >= interactiveLeft &&
      x <= interactiveRight &&
      y >= interactiveTop &&
      y <= interactiveBottom;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableHover || !isVisible) return;
      const rect = canvas.getBoundingClientRect();
      isHovering = isInsideTextArea(
        e.clientX - rect.left,
        e.clientY - rect.top,
      );
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!enableHover || !isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      isHovering = isInsideTextArea(
        touch.clientX - rect.left,
        touch.clientY - rect.top,
      );
    };

    const handleTouchEnd = () => {
      isHovering = false;
    };

    if (enableHover) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
      canvas.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrameId);
      } else if (isVisible) {
        animationFrameId = window.requestAnimationFrame(() => {
          init();
        });
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          animationFrameId = window.requestAnimationFrame(() => {
            refillNoise();
          });
        } else if (!isVisible) {
          window.cancelAnimationFrame(animationFrameId);
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(canvas);

    init();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (enableHover) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
      offscreen = null;
    };
  }, [
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity,
  ]);

  return <canvas ref={canvasRef} aria-label={String(children)} />;
};

export default React.memo(FuzzyText);
