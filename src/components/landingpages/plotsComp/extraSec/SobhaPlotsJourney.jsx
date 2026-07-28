"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  TreePine,
  ShieldCheck,
  Map,
  Droplets,
  Zap,
  Building,
  Leaf,
  Sun,
  ArrowRight,
} from "lucide-react";

// --- DATA CONFIGURATION ---
const HIGHLIGHTS_DATA = [
  {
    id: 1,
    title: "A Sprawling 13-Acre Canvas",
    tags: ["Low Density", "150 Exclusive Plots"],
    desc: "Experience the luxury of space in a meticulously planned 13-acre sanctuary. With only 150 premium plots, this low-density development ensures maximum privacy, open skies, and serene living.",
    src: "https://res.cloudinary.com/djxsxevds/image/upload/v1783603532/plots_i1dfxp.jpg",
  },
  {
    id: 2,
    title: "The Perfect Foundation",
    tags: ["1200 Sq. Ft.", "2400 Sq. Ft."],
    desc: "Choose from ideally sized dimensions to build your dream villa. Whether you envision a cozy retreat or a grand family estate, our carefully measured, Vaastu-compliant plots provide the ultimate blank canvas.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775667533/5_opora9.jpg",
  },
  {
    id: 3,
    title: "Lush Green Surroundings",
    tags: ["Avenue Trees", "Themed Gardens"],
    desc: "Immerse yourself in nature with beautifully landscaped streetscapes, abundant avenue plantations, and themed parks designed to offer a tranquil escape from the city's hustle and bustle.",
    src: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775667528/4_advgdb.jpg",
  },
  {
    id: 4,
    title: "World-Class Infrastructure",
    tags: ["Wide Roads", "Underground Cabling"],
    desc: "Enjoy the seamless convenience of premium infrastructure. From wide, well-laid internal asphalt roads to hidden underground utility cabling and efficient water management systems.",
    src: "https://res.cloudinary.com/djxsxevds/image/upload/v1783603532/garden_pkivjf.jpg",
  },
  {
    id: 5,
    title: "Unmatched Connectivity",
    tags: ["Near Infosys Campus", "Near Express way"],
    desc: "Strategically located in Mysore high-growth zone. Benefit from effortless connectivity to Mysore Express Way, ensuring strong future appreciation.",
    src: "https://res.cloudinary.com/djxsxevds/image/upload/v1783603532/plan_dixvpa.jpg",
  },
];

const AMENITIES_LIST = [
  { icon: TreePine, label: "Avenue Plantation" },
  { icon: ShieldCheck, label: "24/7 Premium Security" },
  { icon: Map, label: "Wide Internal Roads" },
  { icon: Building, label: "Grand Entrance Portal" },
  { icon: Droplets, label: "Water Management" },
  { icon: Leaf, label: "Landscaped Parks" },
  { icon: Zap, label: "Underground Utilities" },
  { icon: Sun, label: "Children's Play Area" },
];

const SobhaPlotsJourney = () => {
  return (
    <section className="relative py-12 md:py-16 bg-[#FAF9F6] overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-gradient-to-b from-[#059669]/5 to-transparent rounded-bl-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* --- SECTION HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[#059669]" />
            <span className="text-[#059669] font-bold text-xs md:text-sm uppercase tracking-[0.2em]">
              The SOBHA Boulevard Mysore Plots Experience
            </span>
            <div className="w-12 h-[1px] bg-[#059669]" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#06170e] tracking-tight">
            Design Your{" "}
            <span className="text-[#059669] font-serif italic">Legacy</span>
          </h2>
        </motion.div>

        {/* --- EDITORIAL HIGHLIGHTS (No connecting lines) --- */}
        <div className="flex flex-col gap-24 md:gap-36">
          {HIGHLIGHTS_DATA.map((item, index) => (
            <EditorialItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* --- PREMIUM AMENITIES SECTION --- */}
        <div className="mt-20 pt-12 border-t border-gray-200/60 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#06170e] mb-4 tracking-tight">
                Flawless <span className="text-[#059669]">Infrastructure</span>
              </h3>
              <p className="text-gray-600 text-lg font-medium leading-relaxed">
                Every detail is engineered to provide a seamless, luxurious, and
                highly secure foundation for the home of your dreams.
              </p>
            </div>
            <button className="group flex items-center gap-2 text-[#059669] font-bold uppercase tracking-widest text-sm hover:text-[#047857] transition-colors pb-1 border-b-2 border-[#059669]/30 hover:border-[#059669]">
              View Master Plan
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {AMENITIES_LIST.map((amenity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#059669]/40 transition-all duration-500"
              >
                {/* Hover Glow Effect */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#059669]/5 rounded-full blur-2xl group-hover:bg-[#059669]/10 transition-colors duration-500" />

                <div className="relative z-10 flex flex-col items-start">
                  <div className="w-12 h-12 bg-gray-50 group-hover:bg-[#059669] rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 text-[#059669] group-hover:text-white shadow-sm">
                    <amenity.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-base font-bold text-gray-900 group-hover:text-[#059669] transition-colors duration-300">
                    {amenity.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENT: EDITORIAL ROW WITH PARALLAX ---
const EditorialItem = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const ref = useRef(null);

  // Custom scroll tracking for the parallax effect on images
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Moves the image slightly opposite to scroll direction for a 3D feel
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* --- PARALLAX IMAGE SIDE --- */}
      <div className="w-full md:w-[55%] relative group">
        <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-gray-100">
          <motion.img
            style={{ y: imageY, scale: 1.15 }}
            src={item.src}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transform origin-center"
          />
          {/* Elegant overlay that lightens on hover */}
          <div className="absolute inset-0 bg-[#06170e]/20 group-hover:bg-transparent transition-colors duration-700" />
        </div>
      </div>

      {/* --- CONTENT SIDE --- */}
      <div className="w-full md:w-[45%] relative">
        {/* Massive Background Watermark Number */}
        <div className="absolute -top-16 -left-6 md:-left-12 text-[8rem] md:text-[12rem] font-black text-gray-900/[0.03] select-none pointer-events-none leading-none tracking-tighter z-0">
          0{index + 1}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative z-10"
        >
          {/* Subtle Step Indicator */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-bold text-[#059669]">
              Step 0{index + 1}
            </span>
            <div className="w-8 h-[1px] bg-[#059669]/50" />
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#06170e] mb-6 leading-[1.15] tracking-tight">
            {item.title}
          </h3>

          <p className="text-gray-600 text-lg leading-relaxed font-medium mb-8">
            {item.desc}
          </p>

          {/* Tags / Badges */}
          <div className="flex flex-wrap gap-3">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white border border-gray-200 text-[#06170e] shadow-sm text-xs font-bold uppercase tracking-widest rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SobhaPlotsJourney;
