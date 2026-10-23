"use client";

import { useState, useEffect, RefObject } from "react";

const phrases = [
  "Basement Architecture & Design",
  "High-Yield Secondary Suites",
  "Multigenerational Living Spaces",
  "Bespoke Interior Transformations",
  "Private Wellness Sanctuaries",
];

interface HeroProps {
  heroTextRef?: RefObject<HTMLDivElement | null>;
}

export default function Hero({ heroTextRef }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFade(true);
      }, 500);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100dvh] min-h-[580px] w-full flex flex-col justify-between items-center text-center text-[#F6F2EA] overflow-hidden pt-20 pb-24 px-5 sm:px-8">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source src="https://pub-e775e47d75734fccadebf45158cf0349.r2.dev/hero_compressed_12MB.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1F2E45]/80 via-[#1F2E45]/65 to-[#1F2E45] backdrop-blur-[1px] z-0" />

      {/* Hero Main Content Block with Fluid Dynamic Vertical Spacing */}
      <div 
        ref={heroTextRef} 
        className="relative z-10 max-w-5xl mx-auto w-full h-full flex flex-col items-center justify-evenly py-[2vh] sm:py-0"
      >
        {/* Badge */}
        <div>
          <span className="text-[#F0B95A] text-[11px] sm:text-sm font-mono tracking-[0.25em] sm:tracking-[0.3em] font-semibold uppercase inline-block reveal-up px-3.5 py-1.5 rounded-full bg-[#1F2E45]/40 border border-[#F0B95A]/25 backdrop-blur-md shadow-md">
            Designer-Led Custom Builds
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.15] sm:leading-[1.1] tracking-tight reveal-up drop-shadow-md">
          See and build your world <br className="hidden sm:inline" />
          with <span className="font-medium text-[#F0B95A] tracking-wider inline-block">LOKAH.</span>
        </h1>

        {/* Dynamic Phrases & Subtitle */}
        <div className="flex flex-col items-center justify-center text-center reveal-up">
          <div className="h-8 sm:h-10 overflow-hidden flex items-center justify-center">
            <span
              className={`text-base sm:text-2xl font-light text-[#F0B95A] tracking-wide transition-all duration-500 transform drop-shadow ${
                fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              {phrases[index]}
            </span>
          </div>

          <p className="mt-1 text-sm sm:text-xl font-medium text-[#F6F2EA]/90 drop-shadow">
            Create a world that is entirely yours.
          </p>
        </div>

        {/* Highlighted Box */}
        <div className="border-y border-[#F6F2EA]/20 py-3 sm:py-6 text-center max-w-2xl mx-auto backdrop-blur-xs rounded-lg px-4">
          <p className="text-[#F6F2EA] font-light text-xs sm:text-base md:text-lg tracking-wide leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            We design custom basements and interior spaces <br />
            that <span className="text-[#F0B95A] font-bold">transcend the ordinary</span>.
          </p>
        </div>

        {/* Portfolio Button */}
        <div className="reveal-up">
          <a
            href="#projects"
            className="px-6 py-3 sm:px-8 sm:py-4 border border-[#F6F2EA]/40 bg-[#1F2E45]/40 backdrop-blur-md text-[#F6F2EA] font-semibold text-xs sm:text-sm tracking-widest uppercase rounded-full hover:bg-[#F6F2EA] hover:text-[#1F2E45] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(246,242,234,0.3)] inline-block"
          >
            Explore Our Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}