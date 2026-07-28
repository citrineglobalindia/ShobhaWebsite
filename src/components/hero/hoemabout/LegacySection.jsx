"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Trophy,
  MapPin,
  Ruler,
  ArrowRight,
  Star,
} from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";
// Ensure this import path matches where you saved the previous DownloadModal component

// --- Real Data for Sobha Limited ---
const STATS = [
  {
    id: 1,
    label: "Completed Projects",
    value: "530+",
    icon: <Building2 className="w-12 h-12 text-[#C5A059]" />,
  },
  {
    id: 2,
    label: "Cities Presence",
    value: "27",
    icon: <MapPin className="w-12 h-12 text-[#C5A059]" />,
  },
  {
    id: 3,
    label: "Awards Won",
    value: "300+",
    icon: <Trophy className="w-12 h-12 text-[#C5A059]" />,
  },
  {
    id: 4,
    label: "Sq. Ft. Delivered",
    value: "148 Mn+",
    icon: <Ruler className="w-12 h-12 text-[#C5A059]" />,
  },
];

const LegacySection = () => {
  // --- STATE FOR MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-white overflow-hidden font-sans">
      {/* --- 1. TOP STATS BAR --- */}
      <div className="w-full bg-[#1a1a1a] text-white py-3 md:py-4 border-b border-[#C5A059]">
        <div className="max-w-8xl mx-auto px-4 text-center">
          <p className="text-[10px] md:text-sm font-medium tracking-widest uppercase flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-[#C5A059]" /> 27 Cities
            </span>
            <span className="hidden md:inline text-[#C5A059]">|</span>
            <span className="flex items-center gap-2">
              <Ruler className="w-3 h-3 text-[#C5A059]" /> 148 Mn Sq. ft.
              Delivered
            </span>
            <span className="hidden md:inline text-[#C5A059]">|</span>
            <span className="flex items-center gap-2">
              <Star className="w-3 h-3 text-[#C5A059]" /> 300+ Awards
            </span>
          </p>
        </div>
      </div>

      <div className="py-12 md:py-16 relative">
        {/* --- BACKGROUND DECORATION --- */}
        <div
          className="absolute bottom-0 left-0 w-full h-48 md:h-80 opacity-15 pointer-events-none z-0"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769447541/shoba-req_iov6vv.jpg')`,
            backgroundPosition: "bottom center",
            backgroundSize: "cover",
            maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 30%, transparent 100%)",
            filter: "grayscale(100%)",
          }}
        />

        <div className="max-w-8xl mx-auto px-4 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* --- LEFT COLUMN: Text Content --- */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-8"
            >
              <div>
                <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-2 block">
                  Our Journey
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-none">
                  Passion at Work. <br />
                  <span className="text-[#C5A059]">Since 1995.</span>
                </h2>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify border-l-4 border-[#C5A059] pl-6">
                Sobha Limited isn't just a name; it's a legacy of trust. For
                over three decades, we have redefined the Indian real estate
                landscape with our unique backward integration model,
                transforming cityscapes across{" "}
                <span className="font-bold text-gray-900">
                  Bengaluru, Dubai, and 26 other cities
                </span>
                .<br />
                <br />
                From presidential suites to luxury villas, our projects reflect
                a simple promise:{" "}
                <span className="text-[#C5A059] font-bold">
                  International Quality
                </span>{" "}
                that endures, and trust that is earned.
              </p>

              {/* CTA Button Integrated with Modal */}
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#C5A059] hover:shadow-xl hover:shadow-[#C5A059]/30"
                >
                  <span className="relative z-10 text-xs font-bold uppercase tracking-widest group-hover:text-black transition-colors">
                    Read Our Story
                  </span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-black transition-colors transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-[#C5A059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left skew-x-12" />
                </button>
              </div>
            </motion.div>

            {/* --- RIGHT COLUMN: Stats Grid --- */}
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#C5A059]/10 blur-[100px] rounded-full -z-10" />

              <motion.div
                className="grid grid-cols-2 gap-5 md:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {STATS.map((stat) => (
                  <motion.div
                    key={stat.id}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 40 },
                      },
                    }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 25px 50px -12px rgba(197, 160, 89, 0.25)",
                    }}
                    className="
                      bg-white p-6 md:p-10 rounded-xs
                      shadow-2xl shadow-gray-200/50 
                      flex flex-col items-center text-center 
                      border border-gray-100 hover:border-[#C5A059] 
                      transition-all duration-300 group cursor-pointer
                      relative overflow-hidden
                    "
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-[#C5A059] transition-colors duration-300" />
                    <div className="mb-5 p-4 bg-gray-50 rounded-xs group-hover:bg-[#C5A059]/10 transition-colors transform group-hover:scale-110 duration-300">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#C5A059] transition-colors">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RENDER MODAL --- */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // We leave defaultProjectName empty so the user can select from the dropdown,
        // or you can pass "Sobha Corporate" if you add it to your data.
      />
    </section>
  );
};

export default LegacySection;
