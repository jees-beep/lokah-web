"use client";

import { useState } from "react";

interface FeasibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimatorData?: {
    projectType?: string;
    area?: number | string;
    finishTier?: string;
    siteConditions?: string;
    estimatedRange?: string;
    promotionsApplied?: string;
  } | null;
}

export default function FeasibilityModal({
  isOpen,
  onClose,
  estimatorData,
}: FeasibilityModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Format estimator breakdown string cleanly
  const summaryText =
    estimatorData && Object.keys(estimatorData).length > 0
      ? `[ESTIMATOR SUMMARY]\nScope: ${
          estimatorData.projectType || "Standard"
        }\nArea: ${estimatorData.area || "N/A"}\nFinish Tier: ${
          estimatorData.finishTier || "Custom"
        }\nSite Conditions: ${
          estimatorData.siteConditions || "Standard"
        }\nIndicative Range: ${
          estimatorData.estimatedRange || "Pending"
        }\nPromos: ${estimatorData.promotionsApplied || "None"}`
      : "[ESTIMATOR SUMMARY]\nDirect Feasibility Review Request";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mkjoevlb", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Formspree Error:", errorData);
        alert("Submission failed. Please check your inputs and try again.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
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
            Request for Feasibility Review
          </span>

          {isSubmitted ? (
            <div>
              <h3 className="text-2xl sm:text-3xl font-light text-[#1F2E45] mb-2">
                Thanks for your submission.
              </h3>
              <p className="text-sm sm:text-base text-[#23262B]/80 font-light leading-relaxed mb-6">
                Congrats on taking the first step on this incredible journey. We've successfully received your estimator data.
              </p>

              <div className="p-6 bg-[#1F2E45] text-[#F0B95A] rounded-xl text-center font-mono text-sm sm:text-base font-normal leading-relaxed shadow-inner">
                The LOKAH Team will review it<br />
                and reach out to you shortly.
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl sm:text-3xl font-light text-[#1F2E45] mb-2">
                Evaluate Your Project Feasibility
              </h3>
              <p className="text-sm sm:text-base text-[#23262B]/80 font-light leading-relaxed mb-6">
                Take the first step toward bringing your vision to life. Share your details below to schedule a tailored review of your scope and budget.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="hidden"
                  name="_subject"
                  value="New Feasibility Review Request - LOKAH Homes"
                />
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                <div>
                  <label
                    htmlFor="feas_name"
                    className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="feas_name"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="feas_email"
                      className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="feas_email"
                      required
                      placeholder="sarah@example.com"
                      className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="feas_phone"
                      className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="feas_phone"
                      required
                      placeholder="(403) 000-0000"
                      className="w-full bg-transparent border-b border-[#1F2E45]/20 focus:border-[#C9825B] py-2 outline-none transition-colors text-xs text-[#1F2E45]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="feas_summary"
                    className="block text-[11px] font-mono uppercase tracking-wider text-[#1F2E45] mb-1 mt-2"
                  >
                    Calculator Brief & Promos Applied
                  </label>
                  <textarea
                    name="estimator_summary"
                    id="feas_summary"
                    rows={5}
                    defaultValue={summaryText}
                    className="w-full bg-[#1F2E45]/5 border border-[#1F2E45]/15 p-3 rounded-xl text-xs text-[#1F2E45] font-mono leading-relaxed resize-none focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-[#C9825B] hover:bg-[#B8693E] text-[#F6F2EA] py-3.5 rounded-full uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Book your Feasibility Review"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}