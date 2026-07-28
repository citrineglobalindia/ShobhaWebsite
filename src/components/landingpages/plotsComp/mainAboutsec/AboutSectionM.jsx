"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Maximize,
  Sparkles,
} from "lucide-react";

const AboutSectionM = () => {
  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const scrollToContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#FAF9F6] font-sans overflow-hidden">
      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#059669]/5 to-transparent pointer-events-none" />
      <div className="absolute -right-64 -bottom-64 w-[800px] h-[800px] bg-[#059669]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* --- SECTION HEADER (Centered above content) --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-[#059669]" />
            <span className="text-[#059669] font-black tracking-[0.2em] uppercase text-xs md:text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Project Overview
            </span>
            <div className="w-12 h-[2px] bg-[#059669]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            An Exclusive Limited <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#10b981] font-serif italic pr-2">
              Plotted Development
            </span>
          </h2>
        </motion.div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* --- LEFT SIDE: IMAGE & FLOATING STATS (7 cols on Desktop) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 relative w-full"
          >
            {/* Decorative Background Frame */}
            <div className="absolute -inset-4 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(5,150,105,0.05)] border border-gray-100 hidden md:block" />

            {/* Main Image Container (Strictly 6:4 Aspect Ratio) */}
            <div className="relative aspect-[6/4] w-full rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5 group isolate z-10">
              <img
                src="https://res.cloudinary.com/djxsxevds/image/upload/v1783604815/about_hn3upk.webp"
                alt="SOBHA Premium Villa Plots Overview"
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />

              {/* Elegant Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06170e]/80 via-[#06170e]/20 to-transparent opacity-60" />
            </div>

            {/* Floating Price Tag (Top Right) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-6 right-4 sm:-right-6 bg-white py-3 px-6 rounded-full shadow-[0_15px_30px_rgba(5,150,105,0.15)] border border-[#059669]/10 backdrop-blur-md z-20 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-gray-900 font-extrabold tracking-tight text-sm md:text-base">
                Pre-Launch: <span className="text-[#059669]">₹----/sq.ft*</span>
              </span>
            </motion.div>

            {/* Floating Experience Card (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-8 left-4 sm:-left-8 bg-white p-5 sm:p-7 rounded-2xl shadow-[0_25px_50px_rgba(5,150,105,0.2)] border border-emerald-50 backdrop-blur-md z-20 flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
                <Maximize className="w-6 h-6 text-[#059669]" />
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none mb-1">
                  13 Acres
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#059669] tracking-wider uppercase">
                  Low-Density Layout
                </span>
                <p className="text-gray-500 text-[10px] sm:text-xs font-medium mt-1">
                  Only 150 Premium Plots
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT SIDE: COPY & FEATURES (5 cols on Desktop) --- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-center mt-12 lg:mt-0"
          >
            {/* Sales Copy */}
            <div className="prose prose-lg text-gray-600 mb-10 font-medium leading-relaxed">
              <p>
                Presenting an exclusive plotted development by SOBHA at the
                fast-growing corridor near{" "}
                <strong>Mysore / Near Express Highway</strong>.
              </p>
              <p>
                Strategically located in Near Infosys Campus Mysore
                fastest-developing zone, this premium gated community offers an
                ideal canvas for both end-use and high-growth investment. With
                major infrastructure developments happening around Mysore, this
                location is emerging as the city's next investment hotspot.
              </p>
            </div>

            {/* Feature List Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-10"
            >
              {[
                {
                  icon: Maximize,
                  title: "Plot Sizes",
                  desc: "1200 to 2400 sq.ft",
                },
                {
                  icon: ShieldCheck,
                  title: "Premium Quality",
                  desc: "SOBHA planning & execution",
                },
                {
                  icon: MapPin,
                  title: "Prime Connectivity",
                  desc: "Near Infosys Campus",
                },
                {
                  icon: TrendingUp,
                  title: "Strong Appreciation",
                  desc: "Close to Mysore Expressway",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#059669]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#059669]/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#059669]" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Area */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4 border-t border-gray-200">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-xl shadow-[0_10px_20px_rgba(5,150,105,0.3)] hover:shadow-[0_15px_25px_rgba(5,150,105,0.4)] transition-all duration-300"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                  <span className="text-red-600 font-black text-lg">!</span>
                </div>
                <div>
                  <span className="block text-gray-900 font-bold text-sm leading-none mb-1">
                    Limited Inventory
                  </span>
                  <span className="text-[#059669] text-xs font-semibold uppercase tracking-wider">
                    Early Access Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionM;
