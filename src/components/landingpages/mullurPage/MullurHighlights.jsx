"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  MapPin,
  Home,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

const PROJECT = "Sobha Mullur";

const KEY_STATS = [
  { value: "24", label: "Acres of Development*" },
  { value: "11", label: "Residential Wings*" },
  { value: "2,200", label: "Homes / Units*" },
  { value: "₹17K", label: "Per Sq.Ft. Indicative*" },
];

const REASONS = [
  {
    icon: BadgeCheck,
    title: "Prestigious SOBHA Brand",
    desc: "Backed by Sobha Limited's renowned build quality and craftsmanship.",
  },
  {
    icon: MapPin,
    title: "Prime Sarjapur Road Location",
    desc: "Opposite Wipro Office, Kodathi — at the heart of a thriving IT corridor.",
  },
  {
    icon: Home,
    title: "Multiple Configurations",
    desc: "1, 2, 3 & 4 BHK homes to suit every family size and lifestyle.",
  },
  {
    icon: Building2,
    title: "Large-Scale Community",
    desc: "A 24-acre, 11-wing community with around 2,200 residences.",
  },
  {
    icon: Sparkles,
    title: "Exciting Upcoming Launch",
    desc: "An early opportunity to register your interest ahead of the official launch.",
  },
];

const MullurHighlights = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <section className="py-20 bg-[#0a1e38] font-sans relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
            Why Sobha Mullur
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Your Next Address of{" "}
            <span className="text-[#C5A059]">Excellence</span>
          </h2>
          <p className="text-gray-300 text-lg">
            A new landmark residential community on Sarjapur Road, bringing
            together premium homes, thoughtfully designed spaces and an elevated
            lifestyle across a single 24-acre destination.
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

        {/* Reasons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((c, idx) => (
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

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-br from-[#C5A059] to-[#b08d4b] rounded-2xl p-7 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-[#0a1e38] mb-2">
                The Wait Is Almost Over
              </h3>
              <p className="text-[#0a1e38]/80 text-sm leading-relaxed">
                Register your interest to receive EOI details, launch updates and
                the latest project information first.
              </p>
            </div>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-[#0a1e38] hover:bg-white text-white hover:text-[#0a1e38] font-bold px-6 py-3.5 rounded-sm uppercase text-sm tracking-widest transition-all"
            >
              Register Interest <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-10 max-w-3xl mx-auto">
          *All figures — land area, wings, unit count and pricing — are
          indicative and based on the proposed development, subject to official
          confirmation, statutory approvals and applicable terms. Please connect
          with our team for the latest details.
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

export default MullurHighlights;
