"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Maximize2,
  Map,
  Users,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import EnquiryModel from "../ui/model/EnquiryModel";

const MasterPlanSection = ({ isEnquiryModalOpen, setIsEnquiryModalOpen }) => {
  const stats = [
    { label: "Net Site Area", value: "48 Acres", icon: Map },
    { label: "Total Units", value: "3,484", icon: Users },
    { label: "Total Wings", value: "14 Wings", icon: LayoutGrid },
  ];

  return (
    <section className="relative w-full pt-12 md:pt-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="h-[2px] w-10 bg-[#d4af37]" />
              <p className="text-[#8a6d1d] uppercase tracking-[0.3em] text-xs font-bold">
                Strategic Blueprint
              </p>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-[#0a0806] leading-tight">
              Master Plan & <br />
              <span className="italic font-light text-[#d4af37]">
                Architecture
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 max-w-xs text-sm leading-relaxed"
          >
            A meticulously planned 48-acre ecosystem designed for seamless flow,
            premium privacy, and world-class connectivity.
          </motion.p>
        </div>

        {/* Master Plan Display Container */}
        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-100 border border-gray-200 shadow-2xl group">
          {/* The Master Plan Image with Blur Effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full aspect-[4/3] md:aspect-[16/9]"
          >
            <img
              src="https://res.cloudinary.com/djxsxevds/image/upload/v1779468917/masterPlan_lm4epv.webp"
              alt="Project Master Plan"
              className="w-full h-full object-cover blur-[2px] group-hover:blur-0 transition-all duration-1000 opacity-60"
            />
            {/* Pattern Overlay for "Confidential" feel */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </motion.div>

          {/* Centered Unlock Card */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-xl w-full text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4af37]/10 text-[#d4af37] mb-6">
                <Lock className="w-8 h-8" />
              </div>

              <h3 className="text-2xl md:text-3xl font-serif text-[#0a0806] mb-4">
                Unlock High-Res Master Plan
              </h3>
              <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">
                To view the detailed site specifications, zoning layouts, and
                wing orientations, please request the full brochure.
              </p>

              {/* Mini Stats inside Card */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <stat.icon className="w-5 h-5 text-[#d4af37] mb-2" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                      {stat.label}
                    </span>
                    <span className="text-sm font-bold text-[#0a0806]">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEnquiryModalOpen(true)}
                className="w-full py-5 bg-[#0a0806] text-[#d4af37] rounded-xl font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all hover:bg-[#1a1714] shadow-xl"
              >
                Request Access <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* Interactive Tooltip (Desktop Only) */}
          <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 bg-white/90 px-4 py-2 rounded-full border border-gray-200 text-[#0a0806] text-xs font-semibold shadow-lg">
            <Maximize2 className="w-4 h-4 text-[#d4af37]" />
            Full Resolution Available
          </div>
        </div>

        {/* Bottom Legend Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-6"
        >
          {[
            "Temperate Enclave",
            "Tropical Zen",
            "Mediterranean Serenity",
            "World Stadium",
          ].map((zone, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {zone}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <EnquiryModel
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultProjectName="Master Plan Access Request"
      />
    </section>
  );
};

export default MasterPlanSection;
