"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Store,
  Briefcase,
  Hotel,
  Trees,
  Car,
  ArrowRight,
} from "lucide-react";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

const PROJECT = "Sobha Hennur Township";

// Township-wide key numbers (proposed figures)
const KEY_STATS = [
  { value: "50+", label: "Acres Total Land Parcel*" },
  { value: "4,400+", label: "Total Units Proposed*" },
  { value: "12", label: "Residential Wings*" },
  { value: "3.396", label: "Floor Area Ratio (FAR)*" },
];

// Mixed-use composition of the township
const COMPONENTS = [
  {
    icon: Building2,
    title: "Residential Towers",
    desc: "12 wings of premium 1, 2, 3, 3.5 & 4 BHK homes rising 36 to 42 floors, with a maximum height of ~130m.",
  },
  {
    icon: Store,
    title: "Retail & Food Mall",
    desc: "A vibrant retail and food destination bringing shopping, dining and everyday convenience within the community.",
  },
  {
    icon: Briefcase,
    title: "Office Spaces",
    desc: "A dedicated commercial office tower designed for modern workplaces right at your doorstep.",
  },
  {
    icon: Hotel,
    title: "Service Apartments",
    desc: "Hospitality-led service apartments adding flexibility, rental potential and premium living options.",
  },
  {
    icon: Trees,
    title: "Recreation & Amenities",
    desc: "A grand amenity clubhouse block with wellness, sports and leisure experiences for every age group.",
  },
  {
    icon: Car,
    title: "Basement Parking",
    desc: "Multiple basement parking levels (3 to 5 depending on the block) for seamless, secure movement.",
  },
];

// Phase 1 highlights
const PHASE_1 = [
  "12 Residential Towers",
  "1 Amenity Clubhouse Block",
  "Office Tower with Service Apartments",
  "Retail & Food Mall",
  "Multiple Basement Parking Levels (3–5)",
];

const HennurMasterPlan = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <section className="py-20 bg-[#0a1e38] font-sans relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
            The Master Plan
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            A Complete{" "}
            <span className="text-[#C5A059]">Mixed-Use Township</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Sobha Limited proposes a landmark integrated development on Hennur
            Main Road — where homes, workspaces, retail, hospitality and
            recreation come together across a single, thoughtfully planned
            50+ acre destination.
          </p>
        </div>

        {/* Key stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {KEY_STATS.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl px-4 py-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-[#C5A059] mb-1">
                {s.value}
              </p>
              <p className="text-xs md:text-sm text-gray-300 uppercase tracking-wide">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mixed-use components */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {COMPONENTS.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.5 }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C5A059] text-[#0a1e38] flex items-center justify-center mb-5">
                <c.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Phase 1 highlight */}
        <div className="bg-gradient-to-r from-white/10 to-transparent border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="lg:w-1/3">
            <span className="inline-block bg-[#C5A059] text-[#0a1e38] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">
              Phase 1 — 17 Acres
            </span>
            <h3 className="text-3xl font-bold text-white mb-3">
              The First Chapter Begins
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The opening 17-acre phase sets the tone for the wider township,
              combining residences, workspaces, retail and amenities from day
              one.
            </p>
          </div>

          <div className="lg:w-2/3">
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {PHASE_1.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0" />
                  <span className="text-gray-100 text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-white text-[#0a1e38] font-bold px-8 py-4 rounded-sm uppercase text-sm tracking-widest transition-all"
            >
              Enquire About Phase 1 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-8 max-w-3xl mx-auto">
          *All figures — land area, unit count, floor count, heights, FAR and
          phasing — are indicative and based on the proposed development plan,
          subject to statutory approvals and change. Please connect with our
          team for the latest details.
        </p>
      </div>

      <EnquiryModel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProjectName={PROJECT}
      />
    </section>
  );
};

export default HennurMasterPlan;
