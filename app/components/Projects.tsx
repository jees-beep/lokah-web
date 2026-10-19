"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { PROJECTS_DATA as PROJECTS, Project } from "../data/projectsData";

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

  // JSON-LD Schema for SERP Google Search Optimization
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalFirm",
    name: "LOKAH Homes",
    url: "https://lokahhomes.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "AB",
      addressCountry: "CA",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bespoke Architectural Build Services",
      itemListElement: PROJECTS.map((proj) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: proj.title,
          description: proj.description,
          areaServed: proj.location,
        },
      })),
    },
  };

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Inject Structured Schema Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

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
           
          {/* TOP ROW: Title, Location, Airbnb Badge */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-4">
            <div className="max-w-2xl">
              <span className="text-xs text-[#C9825B] font-mono uppercase tracking-wider block mb-2">
                {project.location} &bull; {project.category}
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F6F2EA] mb-4 leading-tight">
                {project.title}
              </h3>

              <p className="text-base text-[#F6F2EA]/70 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Airbnb Badge */}
            {project.airbnbUrl && (
              <div className="p-4 rounded-2xl bg-[#162234]/80 border border-[#F0B95A]/30 backdrop-blur-md flex flex-col gap-2 min-w-[260px] self-start lg:self-start">
                <div className="flex items-center justify-between gap-3">
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

                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#C9825B] font-semibold ml-2.5">
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

          {/* CENTERED PROMINENT CASE STUDY BUTTON */}
          <div className="py-3 border-y border-[#F6F2EA]/10 flex justify-center items-center">
            <Link
              href={`/projects/${project.slug}`}
              className="px-10 py-3.5 bg-[#C9825B] text-[#F6F2EA] hover:bg-[#F0B95A] hover:text-[#1F2E45] rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center gap-3 group"
            >
              <span>Read Full Case Study</span>
              <span className="transform group-hover:translate-x-1 transition-transform text-sm">
                →
              </span>
            </Link>
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
                    rotateRender={90}
                    zoomScale={1.24}
                    translate3D="translate(0px, 0px)"
                  />
                </div>
              )}

              {/* STACKED SECTION 2: Storyboard Narrative (Editorial Block) */}
              {project.storyBlurb && (
                <div className="p-8 sm:p-12 bg-[#162234]/60 border border-[#C9825B]/20 rounded-2xl mb-16">
                  {/* Increased font size to text-xl sm:text-2xl and removed bolding (font-normal) */}
                  <h2 className="text-xl sm:text-2xl font-mono font-normal tracking-widest uppercase text-[#C9825B] mb-8">
                    Architectural Genesis — Two Dreams, One Basement
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm sm:text-base font-light text-[#F6F2EA]/90 leading-relaxed">
                    <div className="border-l border-[#C9825B]/30 pl-5">
                      <strong className="block text-[#F0B95A] font-mono text-xs sm:text-sm uppercase mb-3 font-semibold">
                        01 // The Brief
                      </strong>
                      <p>{project.storyBlurb.challenge}</p>
                    </div>

                    <div className="border-l border-[#C9825B]/30 pl-5">
                      <strong className="block text-[#F0B95A] font-mono text-xs sm:text-sm uppercase mb-3 font-semibold">
                        02 // Acoustic & Spatial Build
                      </strong>
                      <p>{project.storyBlurb.execution}</p>
                    </div>

                    <div className="border-l border-[#C9825B]/30 pl-5">
                      <strong className="block text-[#F0B95A] font-mono text-xs sm:text-sm uppercase mb-3 font-semibold">
                        03 // Revenue & Living Outcome
                      </strong>
                      <p>{project.storyBlurb.outcome}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STACKED SECTION 3: Interactive Photo Gallery Carousel & Thumbnails */}
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