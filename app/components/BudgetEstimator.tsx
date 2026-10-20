"use client";

import { useState } from "react";

interface BudgetEstimatorProps {
  onOpenModal: (leadData?: any) => void;
}

export default function BudgetEstimator({ onOpenModal }: BudgetEstimatorProps) {
  // Core Inputs
  const [projectType, setProjectType] = useState<"basement" | "suite" | "remodel">("basement");
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [areaValue, setAreaValue] = useState<number>(800);
  const [finishTier, setFinishTier] = useState<"signature" | "ultra">("signature");

  // Site Condition Checklist Items
  const [needsElecUpgrade, setNeedsElecUpgrade] = useState<boolean>(false);
  const [needsPrivateEntrance, setNeedsPrivateEntrance] = useState<boolean>(false);
  const [needsDemo, setNeedsDemo] = useState<boolean>(false);

  // Conversion Helpers
  const SQFT_TO_SQM = 0.092903;
  const SQM_TO_SQFT = 10.7639;

  const currentAreaDisplay =
    unit === "sqft" ? areaValue : Math.round(areaValue * SQFT_TO_SQM);

  const handleAreaChange = (val: number) => {
    if (unit === "sqft") {
      setAreaValue(val);
    } else {
      setAreaValue(Math.round(val * SQM_TO_SQFT));
    }
  };

  // Calgary Benchmark Calculation Logic
  const calculateEstimate = () => {
    let baseRatePerSqft = 60;
    if (projectType === "suite") baseRatePerSqft = 110;
    if (projectType === "remodel") baseRatePerSqft = 100;

    const tierMultiplier = finishTier === "ultra" ? 1.35 : 1.0;
    let totalEstimate = areaValue * baseRatePerSqft * tierMultiplier;

    if (needsElecUpgrade) totalEstimate += 20000;
    if (needsPrivateEntrance) totalEstimate += 25000;
    if (needsDemo) totalEstimate += 10000;

    const minEstimate = Math.round(totalEstimate * 0.95);
    const maxEstimate = Math.round(totalEstimate * 1.10);

    return { minEstimate, maxEstimate };
  };

  const { minEstimate, maxEstimate } = calculateEstimate();

  const handleConsultationClick = () => {
    const leadSummary = {
      projectType:
        projectType === "basement"
          ? "Bespoke Private Basement for Personal Use"
          : projectType === "suite"
          ? "Legal Secondary Suite for Revenue Generation"
          : "Residential Interior Spatial Remodeling",
      area: `${areaValue} sq ft (${Math.round(areaValue * SQFT_TO_SQM)} m²)`,
      finishTier: finishTier === "ultra" ? "Ultra-Luxury Retreat" : "LOKAH Signature",
      siteConditions: [
        needsElecUpgrade ? "Electrical Panel Upgrade Needed (<150A)" : null,
        needsPrivateEntrance ? "Private Exterior Entrance Needed" : null,
        needsDemo ? "Existing Basement Demolition Required" : null,
      ]
        .filter(Boolean)
        .join(", ") || "Standard Initial Condition",
      estimatedRange: `$${minEstimate.toLocaleString()} – $${maxEstimate.toLocaleString()} CAD`,
      promotionsApplied: "$1,000 Design Credit Eligible + Complimentary 3D Spatial Scan & Thermostat",
    };
    onOpenModal(leadSummary);
  };

  return (
    <section
      id="estimator"
      className="py-24 px-6 sm:px-12 lg:px-16 bg-[#F6F2EA] text-[#1F2E45] border-t border-[#C9825B]/20 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#C9825B] text-xs sm:text-sm font-mono tracking-[0.3em] font-bold uppercase block mb-3">
            Calgary Architectural Investment Calculator
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#1F2E45]">
            Estimate Your <span className="text-[#C9825B] italic">Project Scope</span>
          </h2>
          <p className="mt-4 text-xs sm:text-base font-light text-[#23262B]/70 max-w-2xl mx-auto">
            Configure your spatial parameters and site conditions to generate a high-level feasibility estimate based on local Calgary benchmarks (CAD $).
          </p>
        </div>

        {/* Calculator Interface Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-[#A8A59D]/30 p-6 sm:p-10 rounded-2xl shadow-xl items-stretch">
          
          {/* Controls Column (Left Side) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-7">
            
            {/* 01. Project Scope */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-[#C9825B] mb-3">
                01 // Select Scope of Work
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "basement", label: "Bespoke Private Basement for Personal Use" },
                  { id: "suite", label: "Legal Secondary Suite for Revenue Generation" },
                  { id: "remodel", label: "Residential Interior Spatial Remodeling" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id as any)}
                    className={`p-3.5 text-center rounded-xl border transition-all duration-300 flex items-center justify-center h-full ${
                      projectType === type.id
                        ? "bg-[#1F2E45] border-[#1F2E45] text-[#F6F2EA] shadow-md"
                        : "border-[#1F2E45]/15 text-[#1F2E45]/70 hover:border-[#C9825B] hover:text-[#C9825B]"
                    }`}
                  >
                    <span className="block text-xs font-semibold leading-snug">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 02. Area Slider + Unit Toggle */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-[#C9825B]">
                  02 // Approximate Area ({currentAreaDisplay.toLocaleString()} {unit === "sqft" ? "sq ft" : "m²"})
                </label>

                {/* Unit Switcher */}
                <div className="inline-flex p-1 bg-[#F6F2EA] rounded-lg border border-[#1F2E45]/15 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setUnit("sqft")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      unit === "sqft"
                        ? "bg-[#1F2E45] text-[#F6F2EA] font-bold shadow-sm"
                        : "text-[#1F2E45]/60 hover:text-[#1F2E45]"
                    }`}
                  >
                    SQ FT
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit("sqm")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      unit === "sqm"
                        ? "bg-[#1F2E45] text-[#F6F2EA] font-bold shadow-sm"
                        : "text-[#1F2E45]/60 hover:text-[#1F2E45]"
                    }`}
                  >
                    M²
                  </button>
                </div>
              </div>

              <input
                type="range"
                min={unit === "sqft" ? 400 : 35}
                max={unit === "sqft" ? 2200 : 200}
                step={unit === "sqft" ? 50 : 5}
                value={currentAreaDisplay}
                onChange={(e) => handleAreaChange(Number(e.target.value))}
                className="w-full h-2 bg-[#F6F2EA] rounded-lg appearance-none cursor-pointer accent-[#C9825B]"
              />

              <div className="flex justify-between items-start text-[10px] text-[#23262B]/50 font-mono mt-2">
                <span>{unit === "sqft" ? "400 sq ft" : "35 m²"}</span>
                
                <span className="text-center leading-tight">
                  {unit === "sqft" ? "1,000 sq ft" : "93 m²"}
                  <span className="block text-[9px] opacity-75">(Calgary Baseline)</span>
                </span>

                <span>{unit === "sqft" ? "2,200 sq ft" : "200 m²"}</span>
              </div>
            </div>

            {/* 03. Site Conditions Checklist */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-[#C9825B] mb-3">
                03 // Current Site Conditions
              </label>
              <div className="space-y-2.5">
                
                {/* Electrical Panel Upgrade */}
                <label className="flex items-center justify-between p-3.5 bg-[#F6F2EA]/60 rounded-xl border border-[#1F2E45]/10 cursor-pointer hover:border-[#C9825B] transition-colors">
                  <div>
                    <span className="text-xs font-semibold text-[#1F2E45] block">
                      Electrical Panel and Service Upgrade Required
                    </span>
                    <span className="text-[10px] text-[#23262B]/60 font-light block">
                      If panel is under 150A (Adds ~$5,000 &ndash; $20,000; depends on excavation requirement and ENMAX guidance)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={needsElecUpgrade}
                    onChange={(e) => setNeedsElecUpgrade(e.target.checked)}
                    className="w-5 h-5 accent-[#C9825B] cursor-pointer"
                  />
                </label>

                {/* Separate Entrance */}
                {projectType !== "remodel" && (
                  <label className="flex items-center justify-between p-3.5 bg-[#F6F2EA]/60 rounded-xl border border-[#1F2E45]/10 cursor-pointer hover:border-[#C9825B] transition-colors">
                    <div>
                      <span className="text-xs font-semibold text-[#1F2E45] block">
                        Need Separate Private Exterior Entrance
                      </span>
                      <span className="text-[10px] text-[#23262B]/60 font-light block">
                        Requires excavation, concrete cutting, and stairs (Adds ~$20,000 &ndash; $30,000)
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={needsPrivateEntrance}
                      onChange={(e) => setNeedsPrivateEntrance(e.target.checked)}
                      className="w-5 h-5 accent-[#C9825B] cursor-pointer"
                    />
                  </label>
                )}

                {/* Existing Demolition */}
                <label className="flex items-center justify-between p-3.5 bg-[#F6F2EA]/60 rounded-xl border border-[#1F2E45]/10 cursor-pointer hover:border-[#C9825B] transition-colors">
                  <div>
                    <span className="text-xs font-semibold text-[#1F2E45] block">
                      Existing Finish - Demolition Required
                    </span>
                    <span className="text-[10px] text-[#23262B]/60 font-light block">
                      Full strip-out and disposal of previously finished space (Adds ~$10,000)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={needsDemo}
                    onChange={(e) => setNeedsDemo(e.target.checked)}
                    className="w-5 h-5 accent-[#C9825B] cursor-pointer"
                  />
                </label>

              </div>
            </div>

            {/* 04. Specification Tier */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-[0.2em] text-[#C9825B] mb-3">
                04 // Finish Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setFinishTier("signature")}
                  className={`p-3.5 text-left rounded-xl border transition-all ${
                    finishTier === "signature"
                      ? "bg-[#1F2E45]/5 border-[#1F2E45] text-[#1F2E45]"
                      : "border-[#1F2E45]/15 text-[#23262B]/60 hover:border-[#1F2E45]/30"
                  }`}
                >
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#1F2E45] mb-1">
                    LOKAH Signature
                  </span>
                  <span className="text-[11px] font-light leading-snug block text-[#23262B]/70">
                    Architectural lighting, luxury vinyl flooring, custom tile, bespoke millwork.
                  </span>
                </button>

                <button
                  onClick={() => setFinishTier("ultra")}
                  className={`p-3.5 text-left rounded-xl border transition-all ${
                    finishTier === "ultra"
                      ? "bg-[#1F2E45]/5 border-[#1F2E45] text-[#1F2E45]"
                      : "border-[#1F2E45]/15 text-[#23262B]/60 hover:border-[#1F2E45]/30"
                  }`}
                >
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#C9825B] mb-1">
                    Luxury Retreat
                  </span>
                  <span className="text-[11px] font-light leading-snug block text-[#23262B]/70">
                    Heated floors, glass wine enclosure, acoustic cinema, sauna/steam spa.
                  </span>
                </button>
              </div>
            </div>

          </div>

          {/* Results Column (Right Side - Navy Box) */}
          <div className="lg:col-span-5 bg-[#1F2E45] text-[#F6F2EA] rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-center lg:text-left shadow-2xl relative overflow-hidden h-full">
            
            <div className="space-y-4">
              <div>
                <span className="text-[#C9825B] text-[10px] font-mono tracking-[0.25em] uppercase font-bold block">
                  Estimated CAD Investment*
                </span>
                <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-light text-[#F0B95A] mt-2 mb-1 font-mono whitespace-nowrap overflow-hidden text-ellipsis">
                  ${minEstimate.toLocaleString()} &ndash; ${maxEstimate.toLocaleString()}
                </div>
                <span className="text-[10px] text-[#F6F2EA]/50 uppercase tracking-widest block font-mono">
                  CAD
                </span>
              </div>

              {/* Special Incentives Stack */}
              <div className="space-y-2.5 pt-1">
                <div className="p-3.5 bg-[#162234] border border-[#C9825B]/40 rounded-xl text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[#C9825B] text-xs">✨</span>
                    <span className="text-[11px] font-semibold text-[#C9825B] uppercase tracking-wider">
                      $1,000 Signature Design Credit
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#F6F2EA]/80 font-light leading-relaxed">
                    Sign a design contract within <strong className="text-[#F6F2EA]">30 business days</strong> of your initial inquiry to lock in a $1,000 credit toward architectural 3D scans & renderings.
                  </p>
                </div>

                <div className="p-3.5 bg-[#162234] border border-[#F0B95A]/30 rounded-xl text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[#F0B95A] text-xs">🌱</span>
                    <span className="text-[11px] font-semibold text-[#F0B95A] uppercase tracking-wider">
                      The Sustainability Gift ($330 Value)
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#F6F2EA]/80 font-light leading-relaxed">
                    Complimentary <strong className="text-[#F6F2EA]">ecobee Smart Thermostat Premium</strong> or <strong className="text-[#F6F2EA]">Google Nest 4th Gen</strong> included with all basement builds.
                  </p>
                </div>

                <div className="p-3.5 bg-[#162234] border border-[#F6F2EA]/20 rounded-xl text-left">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[#F6F2EA] text-xs">☕</span>
                    <span className="text-[11px] font-semibold text-[#F6F2EA] uppercase tracking-wider">
                      The First Site Visit is on Us
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#F6F2EA]/80 font-light leading-relaxed">
                    We bring the architectural eye, the 3D laser scanner and the coffee. Your initial design consultation and on-site spatial assessment are 100% complimentary.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-[#F6F2EA]/10 pt-3 text-xs text-[#F6F2EA]/80 font-light">
                <div className="flex justify-between">
                  <span className="text-[#F6F2EA]/50">
                    {projectType === "suite" ? "City Permits, Drawings & 3D Visuals:" : "Drawings & 3D Visuals:"}
                  </span>
                  <span className="font-medium text-[#F0B95A]">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F6F2EA]/50">Client Dashboard:</span>
                  <span className="font-medium">LOKAH PORTAL</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F6F2EA]/10 mt-4">
              <button
                onClick={handleConsultationClick}
                className="w-full bg-[#C9825B] hover:bg-[#B8693E] text-[#F6F2EA] text-xs uppercase tracking-widest font-semibold py-3.5 rounded-full transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(201,130,91,0.4)] cursor-pointer"
              >
                Book your Feasibility Review
              </button>

              <p className="text-[9px] text-[#F6F2EA]/40 font-light mt-2.5 leading-tight text-center">
                *High-level indicative estimate only. Final project pricing is confirmed following an architectural on-site consultation and site audit.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}