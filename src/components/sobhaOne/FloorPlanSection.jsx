"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Expand,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
} from "lucide-react";
import EnquiryModel from "../ui/model/EnquiryModel";

const floorPlans = [
  {
    type: "Type A",
    title: "4 Bed Grande",
    sqft: "2415 Sq.Ft.",
    wing: "Wing 1",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779469196/florpaln1_rbaxpv.png",
  },
  {
    type: "Type F1",
    title: "3 Bed Grande",
    sqft: "1820 Sq.Ft.",
    wing: "Wing 2",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779469197/florpaln2_zvyumw.png",
  },
  {
    type: "Type C3",
    title: "4 Bed Luxe",
    sqft: "2096 Sq.Ft.",
    wing: "Wing 8",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779469197/florplan3_ivfzgd.png",
  },
  {
    type: "Type J8",
    title: "3 Bed Luxe",
    sqft: "1510 Sq.Ft.",
    wing: "Wing 9",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779469197/florpaln4_xbbeqv.png",
  },
];

const FloorPlanCard = ({ plan, onUnlock }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    whileHover={{ y: -8 }}
    className="relative group bg-[#110f0e] rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/5 p-2 md:p-4 transition-all duration-500 hover:border-[#d4af37]/30 hover:shadow-[0_15px_30px_rgba(212,175,55,0.1)]"
    onClick={onUnlock}
  >
    {/* Floating Tag - Smaller on Mobile */}
    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30">
      <div className="px-2 py-1 md:px-3 md:py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#d4af37] text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
        {plan.type}
      </div>
    </div>

    {/* Portrait Image Container */}
    <div className="relative aspect-[3/4] rounded-xl md:rounded-[1.5rem] overflow-hidden bg-[#0a0806] cursor-pointer">
      <img
        src={plan.img}
        alt={plan.title}
        className="w-full h-full object-cover opacity-40 blur-md scale-110 group-hover:scale-100 transition-transform duration-1000"
      />

      {/* The "Scanner" Line Effect */}
      <motion.div
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[1px] md:h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent z-20 shadow-[0_0_10px_#d4af37]"
      />

      {/* Unlock Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
        <div className="relative scale-75 md:scale-100">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-[#d4af37]/20 blur-lg rounded-full"
          />
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-500">
            <Lock className="w-5 h-5 text-white group-hover:text-black" />
          </div>
        </div>
        <span className="text-white font-bold tracking-[0.2em] uppercase text-[7px] md:text-[9px]">
          Tap to Unlock
        </span>
      </div>
    </div>

    {/* Content Area - Optimized for 2-column mobile */}
    <div className="mt-3 md:mt-5 px-1 pb-1 flex flex-col md:flex-row md:justify-between md:items-end gap-2">
      <div>
        <p className="text-white/40 text-[7px] md:text-[9px] uppercase tracking-widest">
          {plan.wing}
        </p>
        <h4 className="text-white text-xs md:text-lg font-serif truncate">
          {plan.title}
        </h4>
      </div>
      <div className="md:text-right flex items-center md:flex-col gap-2 md:gap-0">
        <p className="text-[#d4af37] font-mono text-[9px] md:text-sm">
          {plan.sqft}
        </p>
      </div>
    </div>
  </motion.div>
);

const FloorPlanSection = ({ isEnquiryModalOpen, setIsEnquiryModalOpen }) => {
  return (
    <section className="relative w-full py-12 md:py-16 bg-[#0a0806] overflow-hidden border-y border-white/5">
      {/* Visual Ambiance */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 relative z-10">
        {/* Header - Compact for Half-Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
              <span className="text-[#d4af37] uppercase tracking-[0.3em] text-[8px] md:text-[10px] font-bold">
                Secure Architectural Access
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              Signature{" "}
              <span className="italic text-[#d4af37]">Blueprints</span>
            </h2>
          </motion.div>

          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => setIsEnquiryModalOpen(true)}
            className="flex items-center gap-3 text-white/60 hover:text-[#d4af37] transition-colors text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-2"
          >
            Request Brochure <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Responsive Grid: 2 columns mobile, 4 columns desktop */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {floorPlans.map((plan, index) => (
            <FloorPlanCard
              key={index}
              plan={plan}
              onUnlock={() => setIsEnquiryModalOpen(true)}
            />
          ))}
        </motion.div>

        {/* Minimal Footer Info */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 opacity-30 group">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-4 h-4" />
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest">
              Biometric Data Protection
            </span>
          </div>
          <div className="w-[1px] h-4 bg-white/20 hidden md:block" />
          <div className="flex items-center gap-2">
            <Expand className="w-4 h-4" />
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest">
              Precise Unit Dimensions
            </span>
          </div>
        </div>
      </div>

      <EnquiryModel
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultProjectName="Floor Plan Detail Access"
      />
    </section>
  );
};

export default FloorPlanSection;
