"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import FloatingCTA from "./components/FloatingCTA";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import BudgetEstimator from "./components/BudgetEstimator";
import Projects from "./components/Projects";

const phrases = [
    "Basement Architecture & Design",
    "High-Yield Secondary Suites",
    "Multigenerational Living Spaces",
    "Bespoke Interior Transformations",
    "Private Wellness Sanctuaries"
  ];


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Prevent mobile address bar resize jumps & normalize scroll physics
  ScrollTrigger.config({ ignoreMobileResize: true });
  ScrollTrigger.normalizeScroll(true);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  // Modal & Lead Data States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"standard" | "estimator">("standard");
  const [estimatorData, setEstimatorData] = useState<any>(null);

  
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

 useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % PHRASES.length);
        setFade(true);
      }, 500);
    }, 2500);

    return () => clearInterval(timer);
  }, []); // Empty dependency array

  // 1. Standard Design Consultation CTA Handler
  const handleOpenStandardModal = (e?: any) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    setModalMode("standard");
    setEstimatorData(null);
    setIsModalOpen(true);
  };

  // 2. Estimator Feasibility Review CTA Handler
  const handleOpenEstimatorModal = (leadData: any) => {
    setModalMode("estimator");
    setEstimatorData(leadData);
    setIsModalOpen(true);
  };

  useGSAP(
    () => {
      // 1. Hero Text Parallax & Fade
      gsap.to(heroTextRef.current, {
        y: 150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Reveal Animations for Text Blocks
      const revealElements = gsap.utils.toArray<HTMLElement>(".reveal-up");
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      // 3. Horizontal Scroll for Services
      const sections = gsap.utils.toArray<HTMLElement>(".horizontal-panel");
      if (sections.length > 0 && horizontalScrollRef.current) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalScrollRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${horizontalScrollRef.current?.offsetWidth || window.innerWidth}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }

      // 4. Color Transition Effect
      const darkSections = gsap.utils.toArray<HTMLElement>(".theme-dark");
      darkSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () =>
            gsap.to(mainRef.current, {
              backgroundColor: "#1F2E45",
              color: "#F6F2EA",
              duration: 0.8,
            }),
          onLeaveBack: () =>
            gsap.to(mainRef.current, {
              backgroundColor: "#F6F2EA",
              color: "#23262B",
              duration: 0.8,
            }),
        });
      });

      // 5. Layer-Based Parallax
      gsap.to(".parallax-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".parallax-fg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 6. Project Showcase Parallax Physics
      const projectContainers = gsap.utils.toArray<HTMLElement>(".project-container");

      projectContainers.forEach((container) => {
        gsap.to(container.querySelector(".parallax-bg-slow"), {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(container.querySelector(".parallax-fg-fast"), {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: mainRef }
  );

  return (
    <main ref={mainRef} className="min-h-screen bg-[#1F2E45] text-[#F6F2EA] relative">
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-[#1F2E45] pt-36 pb-20 px-6 sm:px-8 flex flex-col justify-center items-center text-center text-[#F6F2EA]">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <span className="text-[#C9825B] text-xs sm:text-sm font-mono tracking-[0.3em] font-bold uppercase mb-6 block reveal-up">
            Designer-Led Custom Builds
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight mb-6 reveal-up">
            See and build your world <br className="hidden sm:inline" />
            with <span className="font-medium text-[#F0B95A] tracking-wider inline-block">LOKAH.</span>
          </h1>

          <div className="mt-2 flex flex-col items-center justify-center text-center reveal-up">
            <div className="h-10 overflow-hidden flex items-center justify-center">
              <span
                className={`text-lg sm:text-2xl font-light text-[#F0B95A] tracking-wide transition-all duration-500 transform ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                {phrases[index]}
              </span>
            </div>

            <p className="mt-2 text-base sm:text-xl font-medium text-[#F6F2EA]/90">
              Create a world that is entirely yours.
            </p>
          </div>

          <div className="border-y border-[#F6F2EA]/15 py-6 my-6 text-center max-w-2xl mx-auto">
            <p className="text-[#F6F2EA] font-light text-sm sm:text-base md:text-lg tracking-wide leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              We design custom basements and interior spaces that <span className="text-[#F0B95A] font-bold">transcend the ordinary</span>.
            </p>
          </div>

          <div className="mt-4 reveal-up">
            <a
              href="#projects"
              className="px-8 py-4 border border-[#F6F2EA]/30 text-[#F6F2EA] font-semibold text-xs sm:text-sm tracking-widest uppercase rounded-full hover:bg-[#F6F2EA] hover:text-[#1F2E45] transition-all"
            >
              Explore Our Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* THE MEANING */}
      <section id="vision" className="min-h-screen w-full flex items-center justify-center py-32 px-8 bg-[#F6F2EA]">
        <div className="max-w-4xl text-center reveal-up">
          <h2 className="text-4xl md:text-6xl font-light text-[#1F2E45] leading-tight">
            Lokah is Sanskrit for "world" — from the root lok, meaning <span className="italic text-[#C9825B]">"to see"</span> or "to perceive."
          </h2>
          <div className="h-px w-24 bg-[#C9825B] mx-auto my-12"></div>
          <p className="text-2xl text-[#23262B] font-light leading-relaxed">
            We design worlds, not walls. Your home isn't pulled from a standard blueprint template. It is your own world, shaped around how you actually live in it. A space is something you feel, not just live in.
          </p>
        </div>
      </section>

      {/* HORIZONTAL SCROLL: SERVICES */}
      <section
        id="engineering"
        ref={horizontalScrollRef}
        className="h-screen w-full flex flex-nowrap bg-[#23262B] text-[#F6F2EA] overflow-hidden relative"
      >
        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-12 md:p-24 relative bg-[#1F2E45]">
          <div className="relative z-10 max-w-3xl">
            <p className="text-[#F0B95A] text-sm uppercase tracking-[0.3em] mb-4">
              01. Subterranean Development
            </p>
            <h3 className="text-5xl md:text-7xl font-light mb-6">
              Engineered for <br />
              Revenue & Retreat.
            </h3>
            <p className="text-xl text-[#A8A59D] font-light">
              We transcend the ordinary basement. Whether it is a high-yield
              secondary suite for immediate ROI or a bespoke private wellness
              sanctuary, we handle the entire architectural lifecycle.
            </p>
          </div>
        </div>

        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-12 md:p-24 relative bg-[#162234]">
          <div className="relative z-10 max-w-3xl">
            <p className="text-[#F0B95A] text-sm uppercase tracking-[0.3em] mb-4">
              02. Spatial Re-Engineering
            </p>
            <h3 className="text-5xl md:text-7xl font-light mb-6">
              Elevate and Evolve <br />
              Your Living Spaces.
            </h3>
            <p className="text-xl text-[#A8A59D] font-light">
              We strip away the limitations of your current layout. Our
              design-build delivery revamps your spaces through high-concept
              remodeling—aligning your interiors with your ambition.
            </p>
          </div>
        </div>

        <div className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-12 md:p-24 relative bg-[#23262B]">
          <div className="relative z-10 max-w-3xl">
            <p className="text-[#F0B95A] text-sm uppercase tracking-[0.3em] mb-4">
              03. Integrated Systems
            </p>
            <h3 className="text-5xl md:text-7xl font-light mb-6">
              Intelligent, High-Performance <br />
              Infrastructure.
            </h3>
            <p className="text-xl text-[#A8A59D] font-light">
              An ecosystem, not just a house. From EV charging and advanced HVAC
              under-floor heating, to whole-home water filtration - we build the
              future of your home.
            </p>
          </div>
        </div>
      </section>

      {/* IMMERSIVE SCROLLYTELLING SHOWCASE */}
      <section className="relative h-[150vh] w-full overflow-hidden parallax-container">
        <div className="absolute inset-0 w-full h-full parallax-bg">
          <img
            src="/images/projects/%231/96%20CRP%20-1.jpg"
            alt="LOKAH Interior Scan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1F2E45]/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-screen px-8 text-center parallax-fg">
          <span className="text-[#F0B95A] text-sm uppercase tracking-[0.3em] font-semibold mb-6">
            Scan-To-Design
          </span>
          <h3 className="text-5xl md:text-7xl font-light text-[#F6F2EA] max-w-4xl leading-tight">
            Walk the space before a single wall goes up.
          </h3>
        </div>
      </section>

      {/* MODULAR FEATURED PROJECTS PORTFOLIO */}
      <Projects />

      {/* INTERACTIVE BUDGET ESTIMATOR */}
      <BudgetEstimator onOpenModal={handleOpenEstimatorModal} />

      {/* THE FOUNDER'S ETHOS */}
      <section id="about" className="py-32 px-6 sm:px-8 bg-[#1F2E45] text-[#F6F2EA] flex justify-center border-t border-[#C9825B]/20">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal-up">
            <span className="text-[#C9825B] text-sm sm:text-base font-mono tracking-[0.3em] font-bold uppercase mb-4 block">
              The Genesis
            </span>
            <h2 className="text-4xl md:text-6xl font-light leading-tight mb-8">
              Ending the <br /> <span className="text-[#F0B95A] italic">"Leap of Faith."</span>
            </h2>
            <p className="text-lg md:text-xl font-light text-[#A8A59D] leading-relaxed mb-6">
              We founded LOKAH Homes to bridge the gap between vision and reality. By combining creative architectural design power with an obsession for the customer experience, we engineered a studio that eliminates the guesswork.
            </p>
            <p className="text-base font-light text-[#A8A59D]/80 leading-relaxed">
              Where others offer static drawings, we offer living designs - which are immersive, collaborative, and emotionally resonant. You are free from stress and surprise costs at the end of the build process.
            </p>
          </div>

          <div className="relative h-[60vh] w-full rounded-sm overflow-hidden reveal-up shadow-2xl">
            <Image
              src="/images/jees-profile.jpg"
              alt="Jees - Founder of LOKAH Homes"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* BRAND PILLARS */}
      <section id="pillars" className="py-32 px-8 bg-[#F6F2EA] text-[#23262B]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C9825B] text-sm uppercase tracking-[0.3em] font-semibold text-center mb-16 reveal-up">
            Our Guiding Pillars
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Certainty by Design", desc: "Premium scanning and 3D modeling means your design is accurate before you ever sign—so your price is firm." },
              { title: "Radical Transparency", desc: "One dedicated client portal for every update, payment, and decision. Start to finish accountability." },
              { title: "Emotionally Intelligent Design", desc: "We design for how a space feels to walk into—light, flow, and atmosphere—not just how it's framed." },
              { title: "Worlds, Not Templates", desc: "Every home is shaped around how you actually live, drawing on bold design influences from around the globe." },
              { title: "The Future of Home", desc: "Intelligent, beautiful, transparent living spaces that reflect who you are—and what's next." },
            ].map((pillar, idx) => (
              <div key={idx} className="reveal-up border-t border-[#1F2E45]/20 pt-6">
                <span className="text-[#1F2E45] font-mono text-sm sm:text-base font-bold">0{idx + 1}</span>
                <h4 className="text-xl sm:text-2xl font-medium text-[#1F2E45] mt-3 mb-2">{pillar.title}</h4>
                <p className="text-base sm:text-lg text-[#23262B]/80 leading-relaxed font-light">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE METHODOLOGY */}
      <section id="process" className="py-32 px-6 sm:px-8 bg-[#1F2E45] text-[#F6F2EA] border-t border-[#C9825B]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal-up">
            <span className="text-[#C9825B] text-xs sm:text-sm font-mono tracking-[0.3em] font-bold uppercase block mb-3">
              The Methodology
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#F6F2EA] tracking-tight">
              Experience Your Space First.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Design Companion",
                desc: "Powered by Revit AI plug-ins to create bespoke conceptual designs, including 3D doll-house models and detailed concept boards.",
              },
              {
                title: "Co-Creation Framework",
                desc: "Participate interactively using digital moodboards, smart suggestions, and continuous feedback loops to secure the signature minimal aesthetic.",
              },
              {
                title: "LOKAH PORTAL",
                desc: "A real-time, interactive client portal for absolute timeline transparency, live project visualization, and phased cost estimation.",
              },
            ].map((step, idx) => (
              <div key={idx} className="reveal-up p-10 bg-[#162234] shadow-2xl border-t-4 border-[#C9825B] rounded-sm hover:border-[#F0B95A] transition-colors duration-300">
                <span className="text-[#F0B95A] font-mono text-xs uppercase tracking-widest block mb-6">0{idx + 1} // Phase</span>
                <h3 className="text-2xl font-light text-[#F6F2EA] mb-4">{step.title}</h3>
                <p className="text-base text-[#F6F2EA]/70 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-32 px-6 sm:px-8 bg-[#1F2E45] text-[#F6F2EA] border-t border-[#C9825B]/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal-up">
            <span className="text-[#C9825B] text-xs sm:text-sm font-mono tracking-[0.3em] font-bold uppercase block mb-3">
              Clarity & Precision
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#F6F2EA]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6 reveal-up">
            {[
              {
                q: "How does 'Radical Transparency' work with pricing?",
                a: "Unlike traditional allowances that fluctuate, our scan-to-design precision allows us to engineer a firm cost before construction begins. You see every line item, timeline, and update in your LOKAH PORTAL.",
              },
              {
                q: "What makes LOKAH different from a standard general contractor?",
                a: "We are an Designer-led custom build studio. This means the people designing your world are exactly on the same page as the people building it. There is no disconnect between the architectural vision and the final construction.",
              },
              {
                q: "Do I need to have architectural drawings before contacting you?",
                a: "No. In fact, we prefer to start from a blank slate with you. Through our AI Design Companion and Co-Creation Framework, we handle the entire architectural process from the very first concept to the final build.",
              },
            ].map((faq, idx) => (
              <details key={idx} className="group border-b border-[#F6F2EA]/15 pb-6 cursor-pointer">
                <summary className="text-xl md:text-2xl font-light list-none flex justify-between items-center text-[#F6F2EA] hover:text-[#F0B95A] transition-colors">
                  {faq.q}
                  <span className="text-[#C9825B] group-open:rotate-45 transition-transform duration-300 text-3xl font-light">+</span>
                </summary>
                <p className="mt-4 text-base md:text-lg text-[#F6F2EA]/70 font-light leading-relaxed pr-8 sm:pr-12">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer onOpenModal={handleOpenStandardModal} />

      {/* FLOATING CTA BUTTON */}
      <FloatingCTA onClick={() => setIsModalOpen(true)} />

      {/* GLASSMORPHISM INQUIRY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300">
          <div className="relative w-full max-w-lg bg-[#F6F2EA] text-[#1F2E45] rounded-2xl shadow-2xl overflow-hidden border border-[#1F2E45]/15 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#1F2E45]/50 hover:text-[#1F2E45] text-2xl transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="p-8 sm:p-10">
              
              {/* MODE 1: STANDARD CONSULTATION */}
              {modalMode === "standard" && (
                <>
                  <span className="text-[#C9825B] text-xs font-mono tracking-[0.2em] font-bold uppercase mb-2 block">
                    Private Consultation
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#1F2E45] mb-2">
                    Book a Design Consultation
                  </h3>
                  <p className="text-xs text-[#23262B]/70 font-light leading-relaxed mb-6">
                    Your initial consultation and on-site 3D spatial scan are <strong>100% complimentary</strong>. Tell us a bit about your vision to get started.
                  </p>

                  <form action="https://formspree.io/f/xljdzazr" method="POST" className="space-y-4">
                    <input type="hidden" name="_subject" value="New Design Consultation Request - LOKAH Homes" />

                    <div>
                      <label htmlFor="std_name" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="std_name"
                        required
                        placeholder="e.g. Marcus Vance"
                        className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="std_email" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="std_email"
                          required
                          placeholder="marcus@example.com"
                          className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                        />
                      </div>

                      <div>
                        <label htmlFor="std_phone" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="std_phone"
                          placeholder="(403) 000-0000"
                          className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="std_scope" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1">
                          Scope of Interest *
                        </label>
                        <select
                          name="project_scope"
                          id="std_scope"
                          required
                          defaultValue=""
                          className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45] cursor-pointer"
                        >
                          <option value="" disabled>Select Scope...</option>
                          <option value="Bespoke Private Basement for Personal Use">Bespoke Private Basement for Personal Use</option>
                          <option value="Legal Secondary Suite for Revenue Generation">Legal Secondary Suite for Revenue Generation</option>
                          <option value="Residential Interior Spatial Remodeling">Residential Interior Spatial Remodeling</option>
                          <option value="Custom Architectural Inquiry">Custom Architectural Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="std_timeline" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1">
                          Desired Timeline
                        </label>
                        <select
                          name="timeline"
                          id="std_timeline"
                          defaultValue="Immediate (1-3 Months)"
                          className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45] cursor-pointer"
                        >
                          <option value="Immediate (1-3 Months)">Immediate (1-3 Months)</option>
                          <option value="Upcoming (3-6 Months)">Upcoming (3-6 Months)</option>
                          <option value="Planning Phase (6+ Months)">Planning Phase (6+ Months)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="std_neighborhood" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1">
                        Calgary Neighborhood / Community
                      </label>
                      <input
                        type="text"
                        name="neighborhood"
                        id="std_neighborhood"
                        placeholder="e.g. Mount Royal, Altadore, Rockland Park..."
                        className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                      />
                    </div>

                    <div>
                      <label htmlFor="std_vision" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1 mt-2">
                        Tell Us About Your Vision
                      </label>
                      <textarea
                        name="vision_details"
                        id="std_vision"
                        rows={3}
                        placeholder="Describe your space, design aspirations, or general questions..."
                        className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45] leading-relaxed resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 bg-[#1F2E45] text-[#F6F2EA] py-3.5 rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#C9825B] transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Request Consultation
                    </button>
                  </form>
                </>
              )}

              {/* MODE 2: ESTIMATOR FEASIBILITY REVIEW */}
              {modalMode === "estimator" && (
                <>
                  <span className="text-[#C9825B] text-xs font-mono tracking-[0.2em] font-bold uppercase mb-2 block">
                    Calculated Feasibility Review
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#1F2E45] mb-2">
                    Confirm Your Estimate
                  </h3>
                  <p className="text-xs text-[#23262B]/70 font-light leading-relaxed mb-6">
                    We've captured your calculator configuration below. Submit your details to lock in your <strong>$1,000 Design Credit</strong> and complimentary 3D spatial scan.
                  </p>

                  <form action="https://formspree.io/f/xljdzazr" method="POST" className="space-y-4">
                    <input
                      type="hidden"
                      name="_subject"
                      value={`Estimator Lead (${estimatorData?.estimatedRange || 'Custom'}) - LOKAH Homes`}
                    />

                    <div>
                      <label htmlFor="est_name" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="est_name"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="est_email" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="est_email"
                          required
                          placeholder="sarah@example.com"
                          className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                        />
                      </div>

                      <div>
                        <label htmlFor="est_phone" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="est_phone"
                          required
                          placeholder="(403) 000-0000"
                          className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="est_summary" className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1 mt-2">
                        Calculator Brief & Promos Applied
                      </label>
                      <textarea
                        name="estimator_summary"
                        id="est_summary"
                        rows={5}
                        readOnly
                        value={
                          estimatorData
                            ? `[ESTIMATOR SUMMARY]\nScope: ${estimatorData.projectType}\nArea: ${estimatorData.area}\nFinish Tier: ${estimatorData.finishTier}\nSite Conditions: ${estimatorData.siteConditions}\nIndicative Range: ${estimatorData.estimatedRange}\nPromos: ${estimatorData.promotionsApplied}`
                            : ""
                        }
                        className="w-full bg-[#1F2E45]/5 border border-[#1F2E45]/15 p-3 rounded-xl text-xs text-[#1F2E45] font-mono leading-relaxed resize-none focus:outline-none cursor-default"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 bg-[#C9825B] hover:bg-[#B8693E] text-[#F6F2EA] py-3.5 rounded-full uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 shadow-md cursor-pointer"
                    >
                      Book your Feasibility Review
                    </button>
                  </form>
                </>
              )}

            </div>
          </div>
        </div>
      )}

    </main>
  );
}