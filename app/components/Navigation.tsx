"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#engineering" },
    { name: "Portfolio", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1F2E45]/90 backdrop-blur-md border-b border-[#F6F2EA]/10 px-4 sm:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO & BRAND NAME */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/lokah-logo-circle.png"
            alt="LOKAH Homes Logo"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
          <span className="text-lg sm:text-xl font-medium tracking-wider text-[#F0B95A]">
            LOKAH <span className="font-light text-[#F6F2EA]">HOMES</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION (Hidden on mobile via 'hidden md:flex') */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#F6F2EA]/80 hover:text-[#F0B95A] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* MOBILE HAMBURGER TOGGLE BUTTON (Shown on mobile via 'md:hidden') */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#F6F2EA] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <nav className="md:hidden pt-4 pb-6 px-2 flex flex-col gap-4 border-t border-[#F6F2EA]/10 mt-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-[0.2em] font-medium text-[#F6F2EA] hover:text-[#F0B95A] py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}