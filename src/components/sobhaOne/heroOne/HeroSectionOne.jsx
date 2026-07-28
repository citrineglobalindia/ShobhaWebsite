"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Maximize,
  Building2,
  ArrowRight,
  Download,
  ShieldCheck,
  Zap,
} from "lucide-react";

const sliderImages = [
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463339/mainent_knj6l7.webp",
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463338/area_gfjbix.webp",
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463341/unitplans_c6krgv.webp",
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463342/indoorhall_k0um5q.webp",
  "https://res.cloudinary.com/djxsxevds/image/upload/v1779463340/clubHouse_khp3rw.webp",
];

const HeroSectionOne = ({ setIsEnquiryModalOpen }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
      },
    }),
  };

  if (!mounted) return null;

  return (
    <section className="mt-18 relative w-full h-[100svh] overflow-hidden flex flex-col bg-[#050505] selection:bg-[#d4af37] selection:text-black">
      {/* 1. LAYER: ARCHITECTURAL GRID TEXTURE */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* 2. LAYER: CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center grayscale-[0.4] contrast-[1.1]"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/djxsxevds/image/upload/v1779463339/mainplan_v05icr.webp')`,
            }}
          />
          {/* Pro-Vignette Stack */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)] opacity-90" />
        </motion.div>
      </div>

      {/* 3. LAYER: MAIN CONTENT (Center Weighted) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto w-full">
        {/* Elite Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 md:mb-6 flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full"
        >
          <Zap className="w-3 h-3 text-[#d4af37] animate-pulse" />
          <p className="text-[#d4af37] uppercase tracking-[0.4em] text-[8px] md:text-[10px] font-bold">
            Priority Registration Now Open
          </p>
        </motion.div>

        {/* Headline with Gold Glint */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-serif text-[#fcfbf9] leading-[0.95] tracking-tighter mb-4">
            SOBHA <br />
            <span className="relative inline-block italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#8a6d1d] via-[#fcfbf9] to-[#d4af37] pb-1">
              ONEWORLD
              <motion.div
                animate={{ left: ["-100%", "200%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "linear",
                }}
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              />
            </span>
          </h1>
        </motion.div>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs md:text-md text-[#d1ccc5]/60 font-light max-w-xl mx-auto tracking-wide leading-relaxed mb-4"
        >
          Bengaluru’s Eastern Arch of Tomorrow. A 48-acre sanctuary redefining
          global integrated living.
        </motion.p>

        {/* Compressed Stats Bento */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-3xl mb-4"
        >
          {[
            { icon: Maximize, val: "48", unit: "Acres", label: "Masterplan" },
            {
              icon: Building2,
              val: "3.4K+",
              unit: "Homes",
              label: "Crafted Units",
            },
            { icon: ShieldCheck, val: "5", unit: "Zones", label: "Parks" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="relative p-3 md:p-5 rounded-2xl bg-white/[0.05] border border-white/5 hover:border-[#d4af37]/30 transition-all duration-500"
            >
              <stat.icon className="w-4 h-4 text-[#d4af37] mb-2 mx-auto opacity-70" />
              <h3 className="text-lg md:text-3xl font-serif text-white mb-0.5">
                {stat.val}
                <span className="text-[10px] md:text-xs ml-1 text-white/80">
                  {stat.unit}
                </span>
              </h3>
              <p className="text-[6px] md:text-[8px] uppercase tracking-[0.2em] text-[#d1ccc5]/80">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <button
            onClick={() => setIsEnquiryModalOpen(true)}
            className="group relative px-8 py-4 bg-[#d4af37] overflow-hidden rounded-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-3 text-[#0a0806] font-bold text-[10px] md:text-xs uppercase tracking-widest">
              Schedule Tour <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          <button
            onClick={() => setIsEnquiryModalOpen(true)}
            className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-sm hover:bg-white hover:text-black transition-all duration-500 font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-3"
          >
            Brochure <Download className="w-3 h-3" />
          </button>
        </motion.div>
      </div>

      {/* 4. LAYER: DOCKED BOTTOM GALLERY ( mt-auto prevents overflow ) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-20 w-full mt-auto pb-6"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="h-8 w-[1px] bg-gradient-to-b from-transparent to-[#d4af37]/40 mb-2" />
          <span className="text-[8px] text-[#d4af37]/50 uppercase tracking-[0.4em] font-medium">
            Architecture Preview
          </span>
        </div>

        <div className="w-full overflow-hidden flex relative group">
          {/* Edge Vignettes */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10" />

          <motion.div
            className="flex gap-3 px-2 w-max"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          >
            {[...sliderImages, ...sliderImages, ...sliderImages].map(
              (img, idx) => (
                <div
                  key={idx}
                  className="w-40 h-24 md:w-64 md:h-40 flex-shrink-0 rounded-xl overflow-hidden border border-white/5 bg-[#111] relative"
                >
                  <img
                    src={img}
                    alt="Gallery"
                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl m-1.5 pointer-events-none" />
                </div>
              ),
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 -left-10 w-[400px] h-[400px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default HeroSectionOne;
