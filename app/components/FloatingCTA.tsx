"use client";

import { useEffect, useRef, useState } from "react";

interface FloatingCTAProps {
  onClick: (e?: any) => void;
}

export default function FloatingCTA({ onClick }: FloatingCTAProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Fluid & Liquid Animation Variables
    let currentFillLevel = 0; // 0 = empty, 1 = completely filled
    let waveOffset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate fill level on hover (water rises on hover, drains on leave)
      const targetFill = isHovered ? 1 : 0;
      currentFillLevel += (targetFill - currentFillLevel) * 0.08;

      if (currentFillLevel > 0.001) {
        ctx.save();

        // Clip drawing area to button pill shape
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, height / 2);
        ctx.clip();

        // Calculate water height position
        const waterY = height - currentFillLevel * (height + 20) + 10;

        // Draw Liquid Layer (Primary Wave)
        ctx.fillStyle = "#F0B95A"; // LOKAH Warm Gold Liquid
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 5) {
          // Dual Sine wave equations for natural fluid ripple dynamics
          const y =
            Math.sin(x * 0.03 + waveOffset) * 4 +
            Math.cos(x * 0.015 + waveOffset * 0.8) * 3 +
            waterY;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();

        // Draw Secondary Translucent Wave Overlay for depth
        ctx.fillStyle = "rgba(201, 130, 91, 0.4)"; // Terracotta translucent wave
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 5) {
          const y =
            Math.sin(x * 0.025 - waveOffset * 1.2) * 5 +
            Math.sin(x * 0.04 + waveOffset) * 2 +
            waterY +
            2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      waveOffset += 0.08; // Wave oscillation speed
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Book a Design Consultation"
        className="group relative flex items-center gap-3 bg-[#1F2E45]/90 border border-[#F0B95A]/40 backdrop-blur-xl px-6 py-3.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 hover:border-[#F0B95A] hover:shadow-[0_0_25px_rgba(240,185,90,0.45)] cursor-pointer overflow-hidden"
      >
        {/* INTERACTIVE SINE WAVE LIQUID CANVAS */}
        <canvas
          ref={canvasRef}
          width={300}
          height={56}
          className="absolute inset-0 w-full h-full pointer-events-none rounded-full z-0"
        />

        {/* Pulse Indicator Dot */}
        <span className="relative flex h-2.5 w-2.5 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0B95A] group-hover:bg-[#1F2E45] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F0B95A] group-hover:bg-[#1F2E45] transition-colors duration-300"></span>
        </span>

        {/* Button Label */}
        <span className="relative z-20 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#F6F2EA] group-hover:text-[#1F2E45] transition-colors duration-300 font-mono">
          Book a Design Consultation
        </span>

        {/* Arrow Icon */}
        <span className="relative z-20 text-sm text-[#F0B95A] group-hover:text-[#1F2E45] group-hover:translate-x-1 transition-all duration-300">
          →
        </span>
      </button>
    </div>
  );
}