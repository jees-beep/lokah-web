"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  blueprintImage: string;
  renderImage: string;
  title?: string;
  beforeLabel?: string;
  afterLabel?: string;
  rotateRender?: number; // Flips 180° to match orientations
  zoomScale?: number;    // NEW: Controls magnification (1.0 - 2.0)
  translate3D?: string;  // NEW: CSS Translate values to align walls/boundaries (X and Y offsets)
}

export default function BeforeAfterSlider({
  blueprintImage,
  renderImage,
  title = "2D CAD Blueprint ↔ 3D Spatial Reality",
  beforeLabel = "2D CAD Schematics",
  afterLabel = "3D Built Spatial Reality",
  rotateRender = 89,    // Perfectly flipped to matching directions
  zoomScale = 1.24,      // Magnification scale (adjust as needed, e.g. 1.2 - 1.4)
  translate3D = "translate(5px, -18px)", // Shifts to align with the split-line
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full my-4">
      {title && (
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-mono tracking-widest uppercase text-[#F0B95A]">
            {title}
          </span>
          <span className="text-[10px] font-mono text-[#F6F2EA]/50 uppercase tracking-wider hidden sm:inline">
            Drag slider to compare
          </span>
        </div>
      )}

      {/* Interactive Frame */}
      <div
        ref={containerRef}
        className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[#F6F2EA]/15 shadow-2xl bg-[#1F2E45]/60"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* RIGHT LAYER: Zoomed, Repositioned & Rotated 3D Render (Base Layer) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
          <div
            className="relative w-full h-[105%] transition-transform duration-300"
            style={{
              // Combines 180° rotation, 1.24x scale zoom, and precision shift adjustments
              transform: `rotate(${rotateRender}deg) scale(${zoomScale}) ${translate3D}`,
            }}
          >
            <Image
              src={renderImage}
              alt="3D Spatial Render"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="absolute bottom-4 right-4 bg-[#1F2E45]/80 backdrop-blur-md border border-[#F6F2EA]/15 text-[#F0B95A] text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full z-10">
            {afterLabel}
          </span>
        </div>

        {/* LEFT LAYER: 2D Blueprint (Clipped Top Layer) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <Image
            src={blueprintImage}
            alt="2D Blueprint Schematics"
            fill
            className="object-contain p-2"
            priority
          />
          <span className="absolute bottom-4 left-4 bg-[#1F2E45]/80 backdrop-blur-md border border-[#F0B95A]/30 text-[#F6F2EA] text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full z-10">
            {beforeLabel}
          </span>
        </div>

        {/* DIVIDER BAR & HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#F0B95A] z-20 shadow-[0_0_12px_rgba(240,185,90,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#1F2E45] border-2 border-[#F0B95A] shadow-lg flex items-center justify-center text-[#F0B95A] text-xs font-bold">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}