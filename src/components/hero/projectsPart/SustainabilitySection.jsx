"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Zap, Droplets } from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";

// --- 1. ENRICHED PROJECT DATA ---
const PROJECTS_INFO = [
  {
    id: 1,
    title: "Sustainable Luxury, Built for the Future",
    heading: "Sobha Altair",
    tagline: "The Pinnacle of Urban Luxury",
    description:
      "Experience the height of sophistication at Sarjapur Road, Near Wipro. Sobha Altair blends architectural brilliance with eco-conscious design. Featuring rainwater harvesting, solar power integration, and smart waste management, it offers a lifestyle that is both opulent and responsible.",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769445764/alter_e9eplo.jpg",
    link: "/sobha-altair",
    features: ["Solar Integration", "Smart Waste Mgmt", "IGBC Gold Rated"],
  },
  {
    id: 2,
    title: "Connected Living, Rooted in Nature",
    heading: "Sobha One World",
    tagline: "A Township of Tomorrow",
    description:
      "Nestled in the growth corridor of East Bengaluru, Sobha One World is a self-sustaining township designed for the modern family. With over 60% open green spaces, native landscaping, and advanced water conservation systems, it brings the tranquility of nature to your doorstep.",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769445764/hoskote_zrd82e.jpg",
    link: "/sobha-hoskote",
    features: ["60% Open Space", "Native Landscaping", "Water Conservation"],
  },
  {
    id: 3,
    title: "Global Lifestyle, Local Sustainability",
    heading: "Sobha Town Park",
    tagline: "NYC Inspired Manhattan Towers",
    description:
      "Bring the energy of New York to Bengaluru. Sobha Town Park redefines luxury with its iconic Manhattan-style towers near ITPL. Beyond the aesthetics lies a core of sustainability—energy-efficient glazing, EV charging stations, and a design that maximizes natural light and ventilation.",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769445767/town_swepp3.jpg",
    link: "/sobha-town-park",
    features: ["Energy Efficient Glass", "EV Ready", "Natural Ventilation"],
  },
  {
    id: 4,
    title: "Elegance in Every Element",
    heading: "Sobha Ayana",
    tagline: "Where Nature Meets Elegance",
    description:
      "Located on Panathur Road, Sobha Ayana is a sanctuary of peace. This project harmonizes luxury living with environmental stewardship, featuring a dedicated biodiversity park, organic waste converters, and a commitment to zero-water discharge.",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769445769/ayan_nyswic.jpg",
    link: "/sobha-ayana",
    features: [
      "Biodiversity Park",
      "Zero Water Discharge",
      "Organic Waste Converter",
    ],
  },
];

const SustainabilitySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide Logic (Changes every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === PROJECTS_INFO.length - 1 ? 0 : prev + 1,
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentProject = PROJECTS_INFO[currentIndex];

  return (
    <section className="relative w-full py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* --- LEFT COLUMN: Dynamic Text Content --- */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id} // Triggers animation on change
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                {/* Top Badge */}
                <div className="inline-block">
                  <span className="bg-[#C5A059]/10 text-[#C5A059] px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest">
                    {currentProject.heading}
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {currentProject.title}
                </h2>

                {/* Description */}
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">
                    <span className="font-bold text-gray-900">
                      {currentProject.tagline}.{" "}
                    </span>
                    {currentProject.description}
                  </p>

                  {/* Features List */}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {currentProject.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700 font-medium"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link href={currentProject.link}>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="group relative inline-flex items-center gap-3 bg-[#0a1e38] text-white px-8 py-3.5 rounded-sm overflow-hidden transition-all duration-300 hover:bg-[#C5A059] hover:shadow-lg hover:shadow-[#C5A059]/30"
                    >
                      <span className="relative z-10 text-xs font-bold uppercase tracking-widest group-hover:text-black transition-colors">
                        Know More
                      </span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-black transition-colors transform group-hover:translate-x-1" />

                      {/* Slant Effect on Hover */}
                      <div className="absolute inset-0 bg-[#C5A059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left skew-x-12" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls / Indicators */}
            <div className="flex gap-2 mt-8">
              {PROJECTS_INFO.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-[#C5A059]"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: Image Slider --- */}
          <div className="w-full lg:w-1/2 relative h-[400px] md:h-[500px]">
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#C5A059]/10 blur-[80px] rounded-full -z-10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl shadow-gray-200"
              >
                <Image
                  src={currentProject.image}
                  alt={currentProject.heading}
                  fill
                  className="object-cover object-center"
                  priority
                />

                {/* Gradient Overlay for Text Readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Eco Badge */}
            <div className="absolute -bottom-6 -left-6 md:bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-lg shadow-xl border-l-4 border-[#C5A059] animate-in slide-in-from-right duration-700 delay-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-full">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    Commitment to
                  </p>
                  <p className="text-sm md:text-lg font-bold text-gray-900">
                    Green Living
                  </p>
                </div>
              </div>
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

export default SustainabilitySection;
