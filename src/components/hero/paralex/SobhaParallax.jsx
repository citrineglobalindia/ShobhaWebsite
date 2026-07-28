"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Star,
  ShieldCheck,
  Globe2,
  Clock4,
  LayoutTemplate,
} from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";
// Ensure you have this component or remove the onClick if not needed yet

const FEATURES = [
  {
    title: "Backward Integration",
    desc: "In-house manufacturing from concrete to furniture.",
    icon: <LayoutTemplate className="w-6 h-6 text-[#C5A059]" />,
  },
  {
    title: "Global Standards",
    desc: "German engineering processes meet Indian luxury.",
    icon: <Globe2 className="w-6 h-6 text-[#C5A059]" />,
  },
  {
    title: "On-Time Delivery",
    desc: "27 years of track record delivering before time.",
    icon: <Clock4 className="w-6 h-6 text-[#C5A059]" />,
  },
  {
    title: "Transparent Dealings",
    desc: "No hidden clauses. 100% legally compliant.",
    icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
  },
];

const SobhaParallax = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // --- PARALLAX HOOKS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background moves slower than foreground (Parallax)
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  // Text moves slightly faster to create separation
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  // Stagger Container for Features
  const gridContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const gridItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex items-center overflow-hidden font-sans bg-[#050505]"
    >
      {/* --- 1. DYNAMIC PARALLAX BACKGROUND --- */}
      <motion.div
        className="absolute inset-0 z-0 h-[140%]" // Taller than container for parallax room
        style={{ y: yBg }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769450435/shoba-req_2_legtz5.jpg')`,
          }}
        />
        {/* Advanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/20" />

        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
      </motion.div>

      {/* --- 2. MAIN CONTENT --- */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* --- LEFT: EDITORIAL TEXT (Span 5 Columns) --- */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-8"
            style={{ y: yText }} // Text floats slightly
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated Badge */}
            <div className="flex items-center gap-3">
              <span className="flex h-px w-10 bg-[#C5A059]"></span>
              <span className="text-[#C5A059] font-bold tracking-[0.2em] uppercase text-xs">
                The Sobha Standard
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
              Crafting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#E6C785] via-[#C5A059] to-[#8E7036]">
                Perfection.
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-[#C5A059]/30 pl-6">
              "Quality" is often used, but rarely defined. At Sobha, we define
              it through
              <span className="text-white font-medium"> precision</span>. From
              the structural integrity to the grain of wood in your doorframe,
              nothing is outsourced. We build to last generations.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-[#C5A059] text-black font-bold uppercase tracking-widest text-xs overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Experience It{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </button>
            </div>
          </motion.div>

          {/* --- RIGHT: INTERACTIVE GRID (Span 7 Columns) --- */}
          <motion.div
            className="lg:col-span-7"
            variants={gridContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={gridItem}
                  className="group relative p-8 bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:bg-white/10 transition-colors duration-500"
                >
                  {/* Hover Spotlight Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#000]/40 border border-[#C5A059]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C5A059] transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal Integration */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProjectName="General Enquiry"
      />
    </section>
  );
};

export default SobhaParallax;
