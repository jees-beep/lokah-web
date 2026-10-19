"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA } from "../../data/projectsData";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import BeforeAfterSlider from "../../components/BeforeAfterSlider";
import ConsultationModal from "../../components/ConsultationModal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const project = PROJECTS_DATA.find((p) => p.slug === resolvedParams.slug);

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  if (!project) {
    notFound();
  }

  const handleOpenStandardModal = (e?: any) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    setIsConsultationOpen(true);
  };

  // Structured JSON-LD Data for Search Engines
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalFirm",
    name: "LOKAH Homes",
    url: `https://lokahhomes.com/projects/${project.slug}`,
    description: project.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "AB",
      addressCountry: "CA",
    },
  };

  return (
    <main className="min-h-screen bg-[#1F2E45] text-[#F6F2EA] relative">
      {/* Dynamic Browser Tab Title */}
      <title>{`${project.title} | ${project.location} | LOKAH Homes`}</title>
      <meta name="description" content={project.description} />

      {/* Inject Structured Data Schema for Google SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <Navigation onOpenModal={handleOpenStandardModal} />

      {/* FLOATING RETURN TO HOME PAGE BUTTON */}
      <div className="fixed bottom-6 left-6 z-50">
        <Link
          href="/#projects"
          className="px-6 py-3 bg-[#C9825B] text-[#F6F2EA] hover:bg-[#F0B95A] hover:text-[#1F2E45] rounded-full text-xs sm:text-sm font-mono font-bold uppercase tracking-widest transition-all duration-300 shadow-2xl flex items-center gap-3 group border border-[#F6F2EA]/10 backdrop-blur-md"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform text-sm">
            ←
          </span>
          <span>Return to Home Page</span>
        </Link>
      </div>

      <article className="pt-36 pb-24 px-6 sm:px-12 max-w-6xl mx-auto">
        {/* Subtitle Line */}
        <span className="text-xs text-[#C9825B] font-mono uppercase tracking-wider block mb-2">
          {project.location} &bull; {project.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-light text-[#F6F2EA] mb-6">
          {project.title}
        </h1>

        <p className="text-lg text-[#F6F2EA]/80 font-light leading-relaxed max-w-3xl mb-12">
          {project.description}
        </p>

        {/* 2D / 3D Before After Slider */}
        {project.blueprintImage && project.renderImage && (
          <div className="mb-12">
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

        {/* FULL-LENGTH EDITORIAL STORYBOARD */}
        <section className="my-16 space-y-12">
          {/* Header */}
          <div className="border-b border-[#C9825B]/20 pb-6">
            <span className="text-xs font-mono text-[#C9825B] uppercase tracking-widest block mb-2 font-semibold">
              In-Depth Case Study
            </span>
            <h2 className="text-xl sm:text-3xl font-mono font-normal tracking-widest uppercase text-[#F0B95A]">
              Architectural Genesis — Two Dreams, One Basement
            </h2>
          </div>

          {/* Act 1: The Brief & The Dilemma */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[#F0B95A] uppercase tracking-widest block">
                01 // The Brief
              </span>
              <h3 className="text-xl font-light text-[#F6F2EA] mt-1">
                Who gives up their world?
              </h3>
            </div>
            <div className="md:col-span-8 text-sm sm:text-base font-light text-[#F6F2EA]/80 leading-relaxed space-y-4">
              <p>
                It started with an unfinished basement in Rockland Park, NW Calgary, and two very different dreams.
                He pictured a man cave: a 110-inch screen, a Sonos surround system with a subwoofer, and movie nights that felt like the cinema.
                She saw a suite that could earn its keep. Add two toddlers who needed the main floor to be loud, messy, and free, and the family faced a familiar question: <em>Who gives up their world?</em>
              </p>
              <p>
                The answer turned out to be that nobody had to. Before any design began, we analyzed short-term rental occupancy data across comparable NW Calgary listings to validate market demand near the Rockies.
              </p>
            </div>
          </div>

          {/* Act 2: Quiet, By Design (Acoustic Engineering) */}
          <div className="p-8 bg-[#162234]/60 border-l-4 border-[#C9825B] rounded-r-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[#F0B95A] uppercase tracking-widest block">
                02 // Engineering
              </span>
              <h3 className="text-xl font-light text-[#F6F2EA] mt-1">
                Quiet, by design.
              </h3>
            </div>
            <div className="md:col-span-8 text-sm sm:text-base font-light text-[#F6F2EA]/80 leading-relaxed space-y-4">
              <p>
                Toddlers upstairs and movie nights downstairs called for serious sound isolation. We insulated the entire basement ceiling with high-density ROCKWOOL acoustic batt insulation, whose dense fibres trap airborne noise and add fire resistance.
              </p>
              <p>
                We also enclosed and sealed the internal stairwell with ROCKWOOL and drywall, ensuring independent acoustic privacy for both the upstairs family and downstream short-term guests.
              </p>
            </div>
          </div>

          {/* Act 3: Spa Retreat & Remote Turnovers */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[#F0B95A] uppercase tracking-widest block">
                03 // Spatial Execution
              </span>
              <h3 className="text-xl font-light text-[#F6F2EA] mt-1">
                600 sq. ft. Spa Retreat
              </h3>
            </div>
            <div className="md:col-span-8 text-sm sm:text-base font-light text-[#F6F2EA]/80 leading-relaxed space-y-4">
              <p>
                Inside 600 square feet, we designed the space for maximum occupancy (up to four guests) with a full kitchen, soft under-cabinet lighting, dedicated work area, and high-speed Ethernet.
                The living space features a wall-mounted TV, ring-lit color-changing LED shadow lighting for movie-mode, and master bedside switches.
              </p>
              <p>
                The washroom was crafted as a modern spa: veined black marble, floor-to-ceiling tiled walk-in shower, built-in niches, and pre-wired smart LED mirrors.
                Smart Ecobee controls and a master all-off switch near the entrance allowed for zero-touch remote turnovers between guest stays—a critical requirement for a busy family with toddlers.
              </p>
            </div>
          </div>

          {/* Act 4: Global Design Touches */}
          <div className="p-8 bg-[#162234]/40 border border-[#F6F2EA]/10 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[#F0B95A] uppercase tracking-widest block">
                04 // Aesthetic Resonance
              </span>
              <h3 className="text-xl font-light text-[#F6F2EA] mt-1">
                Peacock Blue & Limewash
              </h3>
            </div>
            <div className="md:col-span-8 text-sm sm:text-base font-light text-[#F6F2EA]/80 leading-relaxed">
              <p>
                To harmonize with the homeowners' Indian heritage and their peacock blue kitchen backsplash, LOKAH applied a bespoke limewash technique layering blue and indigo shades.
                This created modern tropical feature walls across the entrance, dining, and cinema areas of the main floor—giving their framed artwork an extraordinary backdrop.
              </p>
            </div>
          </div>
        </section>

        {/* COMPREHENSIVE ARCHITECTURAL GALLERY */}
        <section className="mt-20 border-t border-[#F6F2EA]/10 pt-16">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono text-[#C9825B] uppercase tracking-widest block mb-2 font-semibold">
                Visual Showcase
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-[#F6F2EA]">
                Completed Architectural Photography
              </h3>
            </div>
            <span className="text-xs font-mono text-[#F0B95A]">
              {project.images.length} Curated Perspectives
            </span>
          </div>

          {/* Dynamic Multi-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((img, idx) => {
              const isFeatured = idx === 0 || idx === 3;

              return (
                <div
                  key={idx}
                  className={`relative rounded-2xl overflow-hidden group border border-[#F6F2EA]/10 bg-black/30 shadow-2xl transition-all duration-500 hover:border-[#C9825B]/50 ${
                    isFeatured ? "sm:col-span-2 h-[420px] sm:h-[500px]" : "h-[350px] sm:h-[500px]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} Perspective ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Perspective Label Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                    <span className="text-[10px] font-mono text-[#F0B95A] uppercase tracking-widest bg-[#1F2E45]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#F0B95A]/30">
                      Perspective {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-mono text-[#F6F2EA]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      LOKAH Studio
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </article>

      <Footer onOpenModal={handleOpenStandardModal} />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}