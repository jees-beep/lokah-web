"use client";

import { useEffect, useRef, useState } from "react";

export default function FloatingCTA({ onClick }: { onClick: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    if (!canvas || !button) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let fillLevel = 0;
    let waveOffset = 0;

    const baseWaveAmplitude = 5;
    const baseWaveFrequency = 0.04;
    const waveSpeed = 0.07;

    const updateCanvasDimensions = () => {
      const rect = button.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
    };

    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);

    const render = () => {
      const rect = button.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const targetFill = isHovered ? 1 : 0;
      const fillRate = isHovered ? 0.012 : 0.025;
      fillLevel += (targetFill - fillLevel) * fillRate;

      waveOffset += waveSpeed;

      const radius = height / 2;

      ctx.save();

      // 1. Clip EVERYTHING strictly within the pill shape
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, radius);
      ctx.clip();

      // 2. Draw Deep Navy Background
      ctx.fillStyle = "#1F2E45";
      ctx.fillRect(0, 0, width, height);

      // 3. Render Liquid Waves (if active)
      if (fillLevel > 0.0001) {
        const currentY = height - fillLevel * height;
        const bleed = 20;

        // Secondary Wave (Depth layer)
        ctx.fillStyle = "rgba(184, 105, 62, 0.45)";
        ctx.beginPath();
        ctx.moveTo(-bleed, height + bleed);
        for (let x = -bleed; x <= width + bleed; x += 2) {
          const y = currentY + Math.sin(x * baseWaveFrequency + waveOffset * 1.4) * (baseWaveAmplitude * 0.8);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width + bleed, height + bleed);
        ctx.closePath();
        ctx.fill();

        // Primary Surface Wave (#C9825B)
        ctx.fillStyle = "#C9825B";
        ctx.beginPath();
        ctx.moveTo(-bleed, height + bleed);
        for (let x = -bleed; x <= width + bleed; x += 2) {
          const wave1 = Math.sin(x * baseWaveFrequency + waveOffset) * baseWaveAmplitude;
          const wave2 = Math.cos(x * 0.025 - waveOffset * 0.7) * (baseWaveAmplitude * 0.5);
          const y = currentY + wave1 + wave2;

          ctx.lineTo(x, y);
        }
        ctx.lineTo(width + bleed, height + bleed);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();

      // 4. Draw Border Frame directly on the Canvas (Inward Stroke)
      const borderWidth = 2;
      ctx.save();
      ctx.strokeStyle = "#C9825B";
      ctx.lineWidth = borderWidth;
      ctx.beginPath();
      ctx.roundRect(
        borderWidth / 2, 
        borderWidth / 2, 
        width - borderWidth, 
        height - borderWidth, 
        radius - borderWidth / 2
      );
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[60]">
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden text-[#F6F2EA] px-7 py-4 rounded-full shadow-2xl transition-all duration-300 text-xs sm:text-sm font-semibold tracking-widest uppercase flex items-center gap-3 hover:shadow-[0_10px_30px_rgba(201,130,91,0.35)] hover:-translate-y-1 group cursor-pointer"
      >
        {/* Unified Canvas (Background + Waves + Inset Border) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
        />

        {/* Button Content */}
        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#F6F2EA]">
          Book a Design Consultation
        </span>

        <span className="relative z-10 text-[#F0B95A] group-hover:text-[#F6F2EA] group-hover:translate-x-1.5 transition-all duration-300 text-base">
          →
        </span>
      </button>
    </div>
  );
}