"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  airbnbUrl?: string;
  rating?: number;
  reviewCount?: string;
  blueprintImage?: string;
  renderImage?: string;
  images: string[];
}

const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "96 Crimson Ridge Place NW",
    category: "Legal Secondary Suite for AirBnB",
    location: "Calgary, AB",
    description:
      "A subterranean residence engineered with high-grade soundproofing, luxury spa-like washroom, integrated ambient architectural lighting, and an independent private entrance.",
    airbnbUrl: "https://airbnb.ca/h/sanctumsanctorum",
    rating: 5.0,
    reviewCount: "Superhost Verified",
    blueprintImage: "/images/projects/%231/blueprint.png",
    renderImage: "/images/projects/%231/rendering.jpeg",
    images: [
      "/images/projects/%231/96%20CRP%20-1.jpg",
      "/images/projects/%231/96%20CRP%20-2.jpg",
      "/images/projects/%231/96%20CRP%20-3.jpg",
      "/images/projects/%231/96%20CRP%20-4.jpg",
      "/images/projects/%231/96%20CRP%20-5.jpg",
      "/images/projects/%231/96%20CRP%20-6.jpg",
      "/images/projects/%231/96%20CRP%20-7.jpg",
    ],
  },
];

export default function Projects() {
  const [activeImageIndexes, setActiveImageIndexes] = useState<{ [key: string]: number }>({
    "project-1": 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = (projectId: string, totalImages: number) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrev = (projectId: string, totalImages: number) => {
    setActiveImageIndexes((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  // Autoplay Timer for Photo Carousel
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      PROJECTS.forEach((project) => {
        handleNext(project.id, project.images.length);
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-[#C9825B] text-xs font-mono tracking-[0.25em] font-bold uppercase block mb-3">
          Curated Portfolio
        </span>
        <h2 className="text-3xl sm:text-5xl font-light text-[#F6F2EA]">
          Featured Architectural Works
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-16">
        {PROJECTS.map((project) => {
          const currentIndex = activeImageIndexes[project.id] || 0;

          return (
            <div
              key={project.id}
              className="bg-[#1F2E45]/40 border border-[#F6F2EA]/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md p-6 lg:p-8 flex flex-col gap-8"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
            >
              {/* TOP ROW: Title, Description, and Airbnb Badge Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#F6F2EA]/10 pb-6">
                <div className="max-w-2xl">
                  <span className="text-xs text-[#C9825B] font-mono block mb-1">
                    {project.location} &bull; {project.category}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-light text-[#F6F2EA] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#F6F2EA]/70 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Airbnb Badge Header */}
                {project.airbnbUrl && (
                  <div className="p-4 rounded-2xl bg-[#1F2E45]/80 border border-[#F0B95A]/30 backdrop-blur-md flex flex-col gap-2 min-w-[260px] self-start lg:self-center">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#F0B95A]">
                        <span className="text-sm">★</span>
                        <span className="text-sm">★</span>
                        <span className="text-sm">★</span>
                        <span className="text-sm">★</span>
                        <span className="text-sm">★</span>
                        <span className="text-xs font-bold text-[#F6F2EA] ml-1.5 font-mono">
                          {project.rating?.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#C9825B]">
                        {project.reviewCount}
                      </span>
                    </div>

                    <a
                      href={project.airbnbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-between text-xs font-medium text-[#F0B95A] hover:text-[#F6F2EA] pt-2 border-t border-[#F6F2EA]/10 transition-colors"
                    >
                      <span>View Airbnb Listing & Ratings</span>
                      <span className="transform group-hover/link:translate-x-1 transition-transform">
                        ↗
                      </span>
                    </a>
                  </div>
                )}
              </div>

              {/* STACKED SECTION 1: 2D/3D Blueprint Comparison Slider */}
              {project.blueprintImage && project.renderImage && (
                <div>
                  <BeforeAfterSlider
                    blueprintImage={project.blueprintImage}
                    renderImage={project.renderImage}
                    title="Scan-To-Design Precision: 2D Blueprint ↔ 3D Spatial Reality"
                    beforeLabel="2D CAD Schematics"
                    afterLabel="3D Built Spatial Reality"
                    rotateRender={89}
                    zoomScale={1}
                    translate3D="translate(0px, 0px)"
                  />
                </div>
              )}

              {/* STACKED SECTION 2: Interactive Photo Gallery Carousel & Thumbnails */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-mono tracking-widest uppercase text-[#F0B95A]">
                    Completed Project Photography
                  </span>
                  <span className="text-[10px] font-mono text-[#F6F2EA]/50 uppercase tracking-wider">
                    Auto-sliding &bull; {currentIndex + 1} of {project.images.length}
                  </span>
                </div>

                {/* Main Image View */}
                <div className="relative h-[280px] sm:h-[540px] w-full rounded-2xl overflow-hidden group bg-black/20">
                  <Image
                    src={project.images[currentIndex]}
                    alt={`${project.title} Image ${currentIndex + 1}`}
                    fill
                    className="object-cover transition-all duration-700 ease-out"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                  />

                  {/* Ambient Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2E45]/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Nav Arrows */}
                  <button
                    onClick={() => handlePrev(project.id, project.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#1F2E45]/70 border border-[#F6F2EA]/20 text-[#F6F2EA] flex items-center justify-center hover:bg-[#F0B95A] hover:text-[#1F2E45] transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10 text-lg"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => handleNext(project.id, project.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#1F2E45]/70 border border-[#F6F2EA]/20 text-[#F6F2EA] flex items-center justify-center hover:bg-[#F0B95A] hover:text-[#1F2E45] transition-all opacity-80 group-hover:opacity-100 cursor-pointer z-10 text-lg"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </div>

                {/* Horizontal Thumbnail Strip */}
                <div className="flex gap-3 overflow-x-auto py-2 scrollbar-none">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setActiveImageIndexes((prev) => ({ ...prev, [project.id]: idx }))
                      }
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                        currentIndex === idx
                          ? "border-[#F0B95A] ring-2 ring-[#F0B95A]/40 scale-105"
                          : "border-[#F6F2EA]/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}