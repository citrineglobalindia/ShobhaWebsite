"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  ArrowRight,
  Coffee,
  Trees,
  Dumbbell,
  Music,
  Star,
} from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";

// --- DATA: NYC THEMED AMENITIES ---
const AMENITIES = [
  {
    id: "bridge",
    title: "The Brooklyn Bridge",
    subtitle: "Iconic Walkway",
    desc: "A stunning architectural replica connecting the towers, offering panoramic views of the cityscape.",
    size: "col-span-12 md:col-span-8", // Large horizontal
    height: "h-64 md:h-96",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616560/2_qibqyb.jpg", // Bridge image
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: "park",
    title: "Central Park",
    subtitle: "70% Open Spaces",
    desc: "Lush landscaped gardens inspired by the lungs of NYC, perfect for morning jogs and evening strolls.",
    size: "col-span-12 md:col-span-4", // Vertical sidebar
    height: "h-64 md:h-96",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616561/11_douw5q.jpg", // Park/Greenery
    icon: <Trees className="w-5 h-5" />,
  },
  {
    id: "club",
    title: "Club Tribeca",
    subtitle: "Manhattan Luxury",
    desc: "A multi-story clubhouse with a rooftop pool, grand ballroom, and retro-themed lounges.",
    size: "col-span-12 md:col-span-4", // Square
    height: "h-64",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616560/3_gimuva.jpg", // Luxury Interior
    icon: <Music className="w-5 h-5" />,
  },
  {
    id: "fitness",
    title: "Wall St. Fitness",
    subtitle: "World-Class Gym",
    desc: "State-of-the-art equipment for the high-flyers.",
    size: "col-span-12 md:col-span-4", // Square
    height: "h-64",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop", // Gym
    icon: <Dumbbell className="w-5 h-5" />,
  },
  {
    id: "cafe",
    title: "5th Ave Cafe",
    subtitle: "Gourmet Experience",
    desc: "Coffee culture right at your doorstep.",
    size: "col-span-12 md:col-span-4", // Square
    height: "h-64",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616559/4_gyzrgu.jpg", // Cafe
    icon: <Coffee className="w-5 h-5" />,
  },
];

const TownparkAmenities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-slate-950 font-sans relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none opacity-[0.03]">
        <h2 className="text-[12rem] font-black text-white leading-none tracking-tighter">
          NEW YORK
        </h2>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-4 md:px-6 lg:px-12 xl:px-12 2xl:px-12 relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-yellow-500 font-bold text-xs uppercase tracking-[0.25em] block mb-2">
              The Manhattan Lifestyle
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Amenities inspired by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                The City That Never Sleeps
              </span>
            </h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-3 px-6 py-3 border border-yellow-500/30 hover:border-yellow-500 text-yellow-500 rounded-full transition-all hover:bg-yellow-500 hover:text-black"
          >
            <Download className="w-4 h-4" />
            <span>Amenities Brochure</span>
          </button>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {AMENITIES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative group overflow-hidden rounded-2xl ${item.size} ${item.height}`}
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-yellow-500 text-xs font-bold uppercase tracking-wider">
                      {item.icon} {item.subtitle}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm max-w-sm line-clamp-2 group-hover:line-clamp-none transition-all">
                      {item.desc}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-100 border border-white/20">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- INTEGRATED MODAL --- */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProjectName="Sobha Town Park"
      />
    </section>
  );
};

export default TownparkAmenities;
