"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Leaf, ShieldCheck } from "lucide-react";

const VillaPlotsPromoSection = () => {
  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#FAF9F6] font-sans overflow-hidden">
      {/* Background Decor for Homepage context */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#059669]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-8xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          // CHANGED: items-center to items-stretch so the image container takes full height
          className="relative w-full rounded-[2rem] md:rounded-[3rem] bg-[#06170e] overflow-hidden shadow-[0_30px_60px_rgba(5,150,105,0.15)] flex flex-col lg:flex-row items-stretch border border-white/90"
        >
          {/* --- AMBIENT GLOW INSIDE CARD --- */}
          <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-[#059669]/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

          {/* --- LEFT SIDE: IMAGE REVEAL --- */}
          {/* CHANGED: Added lg:h-auto and lg:min-h-[550px] to ensure Next Image has a height to fill on laptops */}
          <div className="w-full lg:w-1/2 relative h-[350px] sm:h-[450px] lg:h-auto lg:min-h-[550px] overflow-hidden group">
            {/* Next.js Image Tag */}
            <Image
              src="https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775664948/shobaimg_tqkl2m.jpg"
              alt="SOBHA Premium Villa Plots"
              fill
              className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06170e] via-[#06170e]/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#06170e]/60 lg:to-[#06170e] opacity-90" />

            {/* Floating 'Pre-Launch' Badge */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-white/10 backdrop-blur-md border border-white/20 py-2 px-4 rounded-full flex items-center gap-2 shadow-xl z-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-white text-xs font-bold tracking-widest uppercase shadow-sm">
                New Pre-Launch
              </span>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT & CTA --- */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-4"
            >
              <Leaf className="w-5 h-5 text-[#10b981]" />
              <span className="text-[#10b981] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
                Exclusive Opportunity
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight"
            >
              SOBHA Boulevard <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#34d399] font-serif italic pr-2">
                Mysore Plots
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 font-medium"
            >
              A rare canvas to build your legacy. Spread across 13 pristine
              acres in Mysore fastest-growing corridor, featuring world-class
              infrastructure and low-density living.
            </motion.p>

            {/* Quick Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mb-10"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#10b981]" /> Location
                </p>
                <p className="text-white font-bold text-sm sm:text-base truncate">
                  Near Infosys Campus Mysore
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#10b981]" /> Starting
                  Price
                </p>
                <p className="text-[#10b981] font-bold text-sm sm:text-base">
                  ₹----/sq.ft*
                </p>
              </div>
            </motion.div>

            {/* Redirection Button */}
            <motion.div variants={itemVariants}>
              <Link
                href="/sobha-premium-villa-plots"
                className="group relative inline-flex items-center justify-center gap-3 bg-white text-[#06170e] font-black uppercase tracking-widest py-4 px-8 rounded-xl shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.3)] transition-all duration-300 w-full sm:w-auto overflow-hidden"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-[#10b981]/20 to-transparent skew-x-[-20deg]" />

                <span className="relative z-10 flex items-center gap-2">
                  Explore Project Details
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Global Styles for Shimmer Animation */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default VillaPlotsPromoSection;
