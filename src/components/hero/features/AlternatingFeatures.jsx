"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Minus } from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";

// --- DATA: Feature Sections ---
const SECTIONS = [
  {
    id: 1,
    title: "New Living For Your Dreaming",
    subtitle: "Unmatched Craftsmanship",
    description:
      "Experience a lifestyle defined by precision. Our homes are not just structures; they are a testament to our backward integration model, ensuring every tile and wall meets global standards.",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769451315/shoba_i0it9k.jpg",
    features: ["German Technology", "Seamless Finish", "Timeless Design"],
    cta: "Explore Design",
  },
  {
    id: 2,
    title: "Sustainability at the Core",
    subtitle: "Eco-Conscious Living",
    description:
      "We build for the future. From rainwater harvesting to organic waste management, our projects are designed to minimize environmental impact while maximizing your comfort.",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769451692/shoba_1_budshv.jpg",
    features: ["Solar Power", "Water Recycling", "Green Certification"],
    cta: "Our Green Initiative",
  },
];

// --- SUB-COMPONENT: Single Section ---
const FeatureSection = ({ section, index, onOpenModal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const isEven = index % 2 === 0;

  // Parallax Effect for Text
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center gap-10 lg:gap-16 py-12 lg:py-16`}
    >
      {/* --- BACKGROUND WATERMARK NUMBER --- */}
      <div
        className={`absolute top-0 ${
          isEven ? "left-0 lg:left-10" : "right-0 lg:right-10"
        } text-[150px] md:text-[240px] font-bold text-[#F5F5F5] leading-none select-none -z-10`}
      >
        0{index + 1}
      </div>

      {/* --- IMAGE BLOCK --- */}
      <div className="w-full lg:w-3/5 relative group">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
          {/* Image Zoom Effect */}
          <motion.div
            className="w-full h-full relative"
            initial={{ scale: 1.2 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src={section.image}
              alt={section.title}
              fill
              className="object-cover"
            />
            {/* Dark Gradient Overlay for text readability if needed */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>

          {/* Curtain Reveal Animation (Gold Panel) */}
          <motion.div
            initial={{ width: "100%" }}
            animate={isInView ? { width: "0%" } : {}}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            className={`absolute inset-0 bg-[#C5A059] z-20 ${
              isEven ? "origin-left" : "origin-right"
            }`}
          />
        </div>

        {/* Decorative Offset Border */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20, y: 20 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className={`absolute -bottom-6 ${
            isEven ? "-left-6" : "-right-6"
          } w-2/3 h-2/3 border-2 border-[#C5A059]/30 -z-10 hidden md:block`}
        />
      </div>

      {/* --- TEXT CONTENT BLOCK --- */}
      <motion.div
        style={{ y: yText }} // Parallax Scroll
        className="w-full lg:w-2/5 flex flex-col gap-6 lg:gap-8 relative z-10 px-4 lg:px-0"
      >
        {/* Animated Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 60 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="h-1 bg-[#C5A059]"
        />

        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em] mb-3 block"
          >
            {section.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-[1.1]"
          >
            {section.title}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-gray-600 text-sm md:text-base leading-relaxed"
        >
          {section.description}
        </motion.p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-3 border-l-2 border-gray-200 pl-5 my-2">
          {section.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-center gap-3 group/item cursor-default"
            >
              <Minus className="w-4 h-4 text-[#C5A059] group-hover/item:w-6 transition-all duration-300" />
              <span className="text-sm font-semibold text-gray-800 group-hover/item:text-[#C5A059] transition-colors">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <button
            onClick={onOpenModal}
            className="group relative px-8 py-4 bg-[#1a1a1a] text-white overflow-hidden transition-all hover:shadow-xl hover:shadow-[#C5A059]/20"
          >
            <span className="relative z-10 flex items-center gap-3 font-bold text-xs uppercase tracking-widest group-hover:text-black transition-colors duration-300">
              {section.cta} <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-[#C5A059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- MAIN WRAPPER COMPONENT ---
const AlternatingFeatures = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full bg-white overflow-hidden font-sans">
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        {SECTIONS.map((section, index) => (
          <FeatureSection
            key={section.id}
            section={section}
            index={index}
            onOpenModal={() => setIsModalOpen(true)}
          />
        ))}
      </div>

      {/* Shared Modal */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProjectName="General Feature Enquiry"
      />
    </section>
  );
};

export default AlternatingFeatures;
