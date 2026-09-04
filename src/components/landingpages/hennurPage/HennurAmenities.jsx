"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  ArrowRight,
  Trees,
  Dumbbell,
  Waves,
  Briefcase,
  PawPrint,
  Building2,
} from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";

const PROJECT = "Sobha Hennur Township";

// Placeholder imagery — replace with the official Hennur amenity renders.
const AMENITIES = [
  {
    id: "clubhouse",
    title: "Grand Clubhouse",
    subtitle: "~1.3 Lakh Sq.Ft.*",
    desc: "A world-class lifestyle destination for recreation, wellness and social experiences.",
    size: "col-span-12 md:col-span-8",
    height: "h-64 md:h-96",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    id: "gardens",
    title: "Landscaped Gardens",
    subtitle: "18+ Acres Open Space",
    desc: "Expansive greenery, walking trails and outdoor zones designed for calm, connected living.",
    size: "col-span-12 md:col-span-4",
    height: "h-64 md:h-96",
    image:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2590&auto=format&fit=crop",
    icon: <Trees className="w-5 h-5" />,
  },
  {
    id: "pools",
    title: "Resort-Style Pools",
    subtitle: "Leisure & Relaxation",
    desc: "Beautifully designed pools for relaxation, leisure and family time.",
    size: "col-span-12 md:col-span-4",
    height: "h-64",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2670&auto=format&fit=crop",
    icon: <Waves className="w-5 h-5" />,
  },
  {
    id: "sports",
    title: "Sports & Fitness",
    subtitle: "Active Lifestyle",
    desc: "Multiple sports courts and dedicated fitness and wellness experiences.",
    size: "col-span-12 md:col-span-4",
    height: "h-64",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop",
    icon: <Dumbbell className="w-5 h-5" />,
  },
  {
    id: "cowork",
    title: "Co-Working Spaces",
    subtitle: "Work From Community",
    desc: "Convenient work-friendly areas for modern professionals and flexible lifestyles.",
    size: "col-span-12 md:col-span-4",
    height: "h-64",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616559/4_gyzrgu.jpg",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "pet",
    title: "Pet-Friendly Spaces",
    subtitle: "Inclusive Living",
    desc: "A dedicated pet park supporting a more inclusive community lifestyle.",
    size: "col-span-12 md:col-span-12",
    height: "h-56 md:h-64",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769616561/11_douw5q.jpg",
    icon: <PawPrint className="w-5 h-5" />,
  },
];

const HennurAmenities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-slate-950 font-sans relative overflow-hidden">
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none opacity-[0.03]">
        <h2 className="text-[10rem] md:text-[12rem] font-black text-white leading-none tracking-tighter">
          HENNUR
        </h2>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-4 md:px-6 lg:px-12 relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-yellow-500 font-bold text-xs uppercase tracking-[0.25em] block mb-2">
              A Community Designed Around You
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              A Premium Home That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Extends Beyond Four Walls
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
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
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
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-100 border border-white/20">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProjectName={PROJECT}
      />
    </section>
  );
};

export default HennurAmenities;
