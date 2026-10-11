"use client";

import { useState } from "react";

interface NavigationProps {
  onOpenModal?: (e?: any) => void;
}

export default function Navigation({ onOpenModal }: NavigationProps) {
  const [isEthosOpen, setIsEthosOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleModalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenModal) onOpenModal();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1F2E45]/80 backdrop-blur-xl backdrop-saturate-150 border-b border-[#F6F2EA]/10 shadow-[0_4px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-16 h-20 flex items-center justify-between">
        
        {/* Brand Logo: Clean Symmetrical L + Gold Dot Mark + Gold "LOKAH" & White "HOMES" */}
        <a 
          href="#" 
          className="group flex items-center gap-3 sm:gap-3.5 py-1 cursor-pointer shrink-0"
          aria-label="LOKAH Homes Homepage"
        >
          {/* Rotated L + Dot Badge: Outer rotation for exact house roof angle */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F6F2EA] flex items-center justify-center border border-[#F0B95A]/50 shadow-md group-hover:border-[#F0B95A] group-hover:shadow-[0_0_18px_rgba(240,185,90,0.45)] group-hover:rotate-[135deg] transition-all duration-700 ease-in-out">
            
            <svg 
              viewBox="0 0 100 100" 
              className="w-6 h-6 sm:w-7 sm:h-7 transform transition-transform duration-700 ease-in-out"
            >
              {/* Symmetrical 'L' - Exactly 18px thickness on both axes */}
              <path 
                d="M 20 15 L 20 80 L 85 80 L 85 62 L 38 62 L 38 15 Z" 
                fill="#1F2E45" 
              />
              {/* Signature Gold Dot */}
              <circle 
                cx="72" 
                cy="30" 
                r="13.5" 
                fill="#C9825B" 
                className="transition-all duration-500 origin-[72px_30px] group-hover:fill-[#F0B95A]"
              />
            </svg>
          </div>

          {/* Clean Brand Typography */}
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-lg sm:text-xl font-bold tracking-widest uppercase text-[#F0B95A] transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              LOKAH
            </span>
            <span className="text-lg sm:text-xl font-light tracking-widest uppercase text-[#F6F2EA] transition-opacity duration-300 group-hover:opacity-80">
              HOMES
            </span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION (Hidden on mobile via 'hidden lg:flex') */}
        <nav className="hidden lg:flex items-center gap-6 sm:gap-8">
          
          <a 
            href="#engineering" 
            className="text-xs sm:text-sm text-[#F6F2EA] hover:text-[#F0B95A] tracking-widest uppercase font-medium transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          >
            Services
          </a>

          <a 
            href="#projects" 
            className="text-xs sm:text-sm text-[#F6F2EA] hover:text-[#F0B95A] tracking-widest uppercase font-medium transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          >
            Portfolio
          </a>

          {/* ETHOS DROPDOWN */}
          <div 
            className="relative group py-2"
            onMouseEnter={() => setIsEthosOpen(true)}
            onMouseLeave={() => setIsEthosOpen(false)}
          >
            <button 
              className="text-xs sm:text-sm text-[#F6F2EA] hover:text-[#F0B95A] tracking-widest uppercase font-medium transition-colors duration-300 flex items-center gap-1.5 cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
              Ethos
              <span className={`text-[10px] transition-transform duration-300 ${isEthosOpen ? "rotate-180 text-[#F0B95A]" : "text-[#C9825B]"}`}>
                ▼
              </span>
            </button>

            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 w-56 pt-3 transition-all duration-300 ${
                isEthosOpen 
                  ? "opacity-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="bg-[#1F2E45]/90 backdrop-blur-2xl border border-[#F6F2EA]/15 rounded-2xl shadow-2xl p-2">
                <a
                  href="#about"
                  onClick={() => setIsEthosOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-xs text-[#F6F2EA] hover:text-[#F0B95A] hover:bg-[#F6F2EA]/10 tracking-widest uppercase transition-all duration-200"
                >
                  Founder
                  <span className="block text-[10px] text-[#F6F2EA]/60 lowercase normal-case tracking-normal font-normal mt-0.5">
                    The Genesis
                  </span>
                </a>

                <a
                  href="#pillars"
                  onClick={() => setIsEthosOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-xs text-[#F6F2EA] hover:text-[#F0B95A] hover:bg-[#F6F2EA]/10 tracking-widest uppercase transition-all duration-200"
                >
                  Pillars
                  <span className="block text-[10px] text-[#F6F2EA]/60 lowercase normal-case tracking-normal font-normal mt-0.5">
                    Our Core Principles
                  </span>
                </a>

                <a
                  href="#process"
                  onClick={() => setIsEthosOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-xs text-[#F6F2EA] hover:text-[#F0B95A] hover:bg-[#F6F2EA]/10 tracking-widest uppercase transition-all duration-200"
                >
                  Methodology
                  <span className="block text-[10px] text-[#F6F2EA]/60 lowercase normal-case tracking-normal font-normal mt-0.5">
                    Creative Design-to-Build Process
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* BUDGET ESTIMATOR LINK */}
          <a 
            href="#estimator" 
            className="text-xs sm:text-sm text-[#F6F2EA] hover:text-[#F0B95A] tracking-widest uppercase font-medium transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          >
            Estimator
          </a>

          <a 
            href="#faq" 
            className="text-xs sm:text-sm text-[#F6F2EA] hover:text-[#F0B95A] tracking-widest uppercase font-medium transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          >
            FAQ
          </a>

          {/* LOKAH Portal CTA */}
          <button 
            onClick={handleModalClick}
            className="text-xs sm:text-sm text-[#F0B95A] hover:text-[#1F2E45] border border-[#F0B95A]/70 hover:bg-[#F0B95A] bg-[#1F2E45]/40 backdrop-blur-md px-5 py-2 rounded-full tracking-widest uppercase font-semibold transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(240,185,90,0.4)] cursor-pointer"
          >
            LOKAH Portal
          </button>

        </nav>

        {/* MOBILE HAMBURGER TOGGLE BUTTON (Shown on screens < 1024px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#F6F2EA] focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-[#1F2E45]/95 backdrop-blur-2xl border-b border-[#F6F2EA]/10 px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
          <a
            href="#engineering"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest font-medium text-[#F6F2EA] hover:text-[#F0B95A]"
          >
            Services
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest font-medium text-[#F6F2EA] hover:text-[#F0B95A]"
          >

            Portfolio
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest font-medium text-[#F6F2EA] hover:text-[#F0B95A]"
          >

            Estimator
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest font-medium text-[#F6F2EA] hover:text-[#F0B95A]"
          >
            
            Ethos &bull; Founder
          </a>
          <a
            href="#pillars"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest font-medium text-[#F6F2EA] hover:text-[#F0B95A]"
          >
            Ethos &bull; Pillars
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest font-medium text-[#F6F2EA] hover:text-[#F0B95A]"
          >
            Ethos &bull; Methodology
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase tracking-widest font-medium text-[#F6F2EA] hover:text-[#F0B95A]"
          >
            
            FAQ
          </a>
          <button
            onClick={handleModalClick}
            className="mt-2 text-xs text-center text-[#F0B95A] border border-[#F0B95A]/70 bg-[#1F2E45]/60 px-5 py-3 rounded-full tracking-widest uppercase font-semibold cursor-pointer"
          >
            LOKAH Portal
          </button>
        </nav>
      )}
    </header>
  );
}