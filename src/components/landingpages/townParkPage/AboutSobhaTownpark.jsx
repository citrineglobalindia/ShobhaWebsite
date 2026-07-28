"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Trees,
  MapPin,
  Trophy,
  ArrowRight,
  Download,
} from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";

// --- REAL DATA FROM GOOGLE SEARCH ---
const ABOUT_DATA = {
  title: "Sobha Townpark",
  subtitle:
    "New York Themed Living on Hosur Road, Near Narayan Hrudayala Hospital",
  description:
    "Experience the pulse of the Big Apple in Bangalore. Sobha Townpark is a massive 33-acre integrated township designed to replicate the architectural grandeur and lifestyle of New York City. From the towering Manhattan-style skyscrapers to the vibrant Brooklyn-themed walkways, every corner is crafted for those who aspire for a global lifestyle.",
  highlights: [
    { icon: Building2, label: "NYC Architecture", value: "G+38 Floors" },
    { icon: Trees, label: "Open Spaces", value: "70% Greenery" },
    { icon: Trophy, label: "World-Class", value: "3 Clubhouses" },
    { icon: MapPin, label: "Prime Location", value: "Near E-City" },
  ],
  image:
    "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616560/1_lzvd66.jpg", // Using the Townpark image
};

const AboutSobhaTownpark = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative py-12 lg:py-16 bg-white font-sans overflow-hidden">
      {/* Background Decor (Subtle NYC Map or Grid) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50/50 -skew-x-12 translate-x-20 -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* --- LEFT: IMAGE GRID --- */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={ABOUT_DATA.image}
                alt="Sobha Townpark Architecture"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-white">
                <p className="text-xs uppercase tracking-widest mb-1">Status</p>
                <p className="text-xl font-bold">Under Construction</p>
              </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* --- RIGHT: CONTENT --- */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-[2px] bg-[#C5A059]" />
                <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em]">
                  The Destination
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[#0a1e38] mb-6 leading-tight">
                {ABOUT_DATA.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#b08d4b]">
                  {ABOUT_DATA.subtitle}
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-gray-100 pl-6">
                {ABOUT_DATA.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                {ABOUT_DATA.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-[#C5A059] group-hover:text-white transition-colors duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#0a1e38]">
                        {item.value}
                      </h4>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center gap-3 px-8 py-4 bg-[#0a1e38] text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-[#C5A059] transition-all shadow-xl"
                >
                  Download Brochure{" "}
                  <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
                <a
                  href="#location"
                  className="flex items-center gap-3 px-8 py-4 border border-[#0a1e38]/20 text-[#0a1e38] font-bold text-sm uppercase tracking-widest rounded-sm hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
                >
                  View Masterplan <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Integrated Modal */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProjectName="Sobha Town Park"
      />
    </section>
  );
};

export default AboutSobhaTownpark;
