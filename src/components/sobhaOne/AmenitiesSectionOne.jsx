"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import EnquiryModel from "../ui/model/EnquiryModel";

const amenities = [
  {
    title: "World Stadium",
    category: "Sports",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779467644/sports_hmbqxd.webp",
    // Mobile: Full width | Tablet: 2 cols | Desktop: 2 cols
    size: "col-span-2 md:col-span-2 lg:row-span-2",
  },
  {
    title: "Zen Courtyards",
    category: "Wellness",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779467643/garden_acbvtv.webp",
    size: "col-span-1 md:col-span-1",
  },
  {
    title: "Jogging Tracks",
    category: "Fitness",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779467644/walkarea_wtvwa7.webp",
    size: "col-span-1 md:col-span-1 lg:row-span-2",
  },
  {
    title: "Kids Play Zone",
    category: "Family",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779467645/child-playarea_h32dqk.webp",
    size: "col-span-1 md:col-span-1",
  },
  {
    title: "Clubhouse",
    category: "Social",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779467643/clubHouse_zxmkgr.webp",
    size: "col-span-2 md:col-span-2",
  },
  {
    title: "Green Enclaves",
    category: "Nature",
    img: "https://res.cloudinary.com/djxsxevds/image/upload/v1779467643/green-area_d9vm6m.webp",
    size: "col-span-1 md:col-span-1",
  },
];

const AmenityCard = ({ item, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={`relative group overflow-hidden rounded-3xl bg-[#1a1714] ${item.size} cursor-pointer shadow-2xl`}
    >
      {/* Visual Effect: Image */}
      <motion.img
        src={item.img}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110"
      />

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

      {/* Glassmorphism Badge (Top Right) */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-[-10px] group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
        </div>
      </div>

      {/* Content Bottom */}
      <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full z-10">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="w-6 h-[1px] bg-[#d4af37]" />
            <p className="text-[#d4af37] text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
              {item.category}
            </p>
          </motion.div>
        </div>

        <h3 className="text-xl md:text-3xl font-serif text-white leading-tight group-hover:text-[#d4af37] transition-colors duration-300">
          {item.title}
        </h3>
      </div>

      {/* Subtle border reveal on hover */}
      <div className="absolute inset-0 border border-[#d4af37]/0 group-hover:border-[#d4af37]/40 transition-all duration-700 rounded-3xl pointer-events-none m-3" />
    </motion.div>
  );
};

const AmenitiesSectionOne = ({ isEnquiryModalOpen, setIsEnquiryModalOpen }) => {
  return (
    <section className="relative w-full py-12 md:py-16 bg-[#0a0806] overflow-hidden">
      {/* Advanced Ambient Lighting */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-20 gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="h-[2px] w-16 bg-gradient-to-r from-[#d4af37] to-transparent" />
              <p className="text-[#d4af37] uppercase tracking-[0.5em] text-[10px] md:text-xs font-black">
                The Privilege of Space
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl md:text-8xl font-serif text-[#fcfbf9] leading-[0.95] tracking-tighter"
            >
              Curated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fcfbf9] to-[#8a6d1d] italic font-light pr-4">
                Lifestyle
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-start lg:items-end gap-6"
          >
            <p className="text-white/50 text-sm md:text-base max-w-[300px] lg:text-right font-light leading-relaxed">
              Experience an unparalleled ecosystem of health, leisure, and
              sophisticated social spaces.
            </p>
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="group relative flex items-center gap-4 px-8 py-5 bg-[#d4af37] overflow-hidden rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <Download className="w-5 h-5 text-[#0a0806]" />
              <span className="text-[#0a0806] uppercase tracking-widest text-xs font-bold">
                Download Brochure
              </span>
            </button>
          </motion.div>
        </div>

        {/* Bento Grid: 2 columns mobile, 4 columns desktop */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[280px] gap-3 md:gap-6"
        >
          {amenities.map((item, index) => (
            <AmenityCard key={index} item={item} index={index} />
          ))}
        </motion.div>

        {/* Dynamic Footer Info */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 py-10 border-t border-white/10">
          <div className="flex items-center gap-6">
            {[
              { icon: ShieldCheck, label: "Premium Security" },
              { icon: MapPin, label: "Prime Location" },
              { icon: Sparkles, label: "Luxury Build" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center md:items-start gap-1"
              >
                <feature.icon className="w-5 h-5 text-[#d4af37] mb-1" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => setIsEnquiryModalOpen(true)}
          >
            <span className="text-white/60 text-xs tracking-tighter group-hover:text-[#d4af37] transition-colors">
              SEE ALL 40+ AMENITIES
            </span>
            <div className="w-8 h-[1px] bg-white/20 group-hover:bg-[#d4af37] transition-all" />
          </div>
        </div>
      </div>

      <EnquiryModel
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultProjectName="Luxury Amenities Inquiry"
      />
    </section>
  );
};

export default AmenitiesSectionOne;
