"use client";

import { useState } from "react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimatorData?: any;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/xljdzazr", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Submission failed. Please try again or email directly.");
      }
    } catch (err) {
      alert("An error occurred. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300">
      <div className="relative w-full max-w-lg bg-[#F6F2EA] text-[#1F2E45] rounded-2xl shadow-2xl overflow-hidden border border-[#1F2E45]/15 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#1F2E45]/50 hover:text-[#1F2E45] text-2xl transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="p-8 sm:p-10">
          <span className="text-[#C9825B] text-xs font-mono tracking-[0.2em] font-bold uppercase mb-2 block">
            Design Consultation
          </span>
          <h3 className="text-2xl sm:text-3xl font-light text-[#1F2E45] mb-2">
            Thanks for your submission.
          </h3>
          <p className="text-sm sm:text-base text-[#23262B]/80 font-light leading-relaxed mb-6">
            Your initial design consultation and on-site 3D spatial scan are <strong>100% complimentary</strong>.
            </p>

            {isSubmitted ? (
            <div className="p-6 bg-[#1F2E45] text-[#F0B95A] rounded-xl text-center font-mono text-base sm:text-lg font-semibold leading-relaxed shadow-inner">
                We are reviewing your request.<br />
                The LOKAH Team will reach out shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_subject" value="New Design Consultation Request - LOKAH Homes" />
              <input type="text" name="_gotcha" style={{ display: "none" }} />

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
                disabled={isSubmitting}
                className="w-full mt-4 bg-[#1F2E45] text-[#F6F2EA] py-3.5 rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#C9825B] transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Request Consultation"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}