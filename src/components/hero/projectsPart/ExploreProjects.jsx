"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

// --- 1. SETUP: Create a Motion Link Component ---
// This allows us to use Next.js Link with Framer Motion animations
const MotionLink = motion(Link);

// --- PROJECT DATA WITH LINKS ---
const PROJECTS = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769446295/ayna_fd8gam.png",
    title: "Sobha Ayana",
    subtitle: "Where Nature Meets Elegance",
    location: "Panathur Road, Bengaluru",
    price: "Starts 2.3cr onwards*",
    category: "Residential",
    href: "/sobha-ayana",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769446665/shoba-req_jqzzsd.jpg",
    title: "Sobha One World",
    subtitle: "Connected Living at Its Best",
    location: "Hoskote, East Bengaluru",
    price: "Price not available*",
    category: "Residential",
    href: "/sobha-hoskote",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769446932/shoba-req_1_ciglqr.jpg",
    title: "Sobha Town Park",
    subtitle: "NYC Inspired Manhattan Towers",
    location: "Hosur Road, Near Narayan Hospital",
    price: "Starts ₹1.72 Cr*",
    category: "Residential",
    href: "/sobha-town-park",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg",
    title: "Sobha Altair",
    subtitle: "The Pinnacle of Urban Luxury",
    location: "Sarjapur Road Near Wipro, Bengaluru",
    price: "Starts ₹ 17500/sqft*",
    category: "Residential",
    href: "/sobha-altair",
  },
  // --- ADDED NEW PREMIUM PLOTS ---
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775664046/hero_1_urnb1g.jpg",
    title: "Sobha Boulevard Mysore Plots",
    subtitle: "Exclusive 13-Acre Plotted Development",
    location: "Near Infosys Campus / Mysore",
    price: "₹----/sq.ft*",
    category: "Residential",
    href: "/sobha-premium-villa-plots",
  },
];

const ExploreProjects = () => {
  const [activeTab, setActiveTab] = useState("Residential");
  const [hoveredId, setHoveredId] = useState(null);

  const displayedProjects = PROJECTS;

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 md:px-12">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-2 block">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Explore Our Projects
            </h2>
          </div>

          {/* Tabs Control */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab("Residential")}
              className={`px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeTab === "Residential"
                  ? "bg-[#0a1e38] text-white border-[#0a1e38]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#C5A059] hover:text-[#C5A059]"
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab("Commercial")}
              className={`px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeTab === "Commercial"
                  ? "bg-[#0a1e38] text-white border-[#0a1e38]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#C5A059] hover:text-[#C5A059]"
              }`}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* --- PROJECTS GRID --- */}
        <div
          className="
            w-full
            /* Mobile: Grid Layout (2 Columns) */
            grid grid-cols-2 gap-3
            /* Desktop: Flex Layout (Accordion Row) */
            md:flex md:flex-row md:gap-1 md:h-[500px] lg:h-[600px]
          "
        >
          <AnimatePresence>
            {displayedProjects.map((project) => (
              <MotionLink
                key={project.id}
                href={project.href} // Navigation Link
                layout
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={`
                  relative 
                  overflow-hidden 
                  group 
                  cursor-pointer
                  rounded-xs md:rounded-none
                  
                  /* Mobile Sizing: Fixed height, fits grid column */
                  h-[280px] w-full
                  
                  /* Desktop Sizing: Flexible width for accordion effect. Changed w-1/4 to w-1/5 because there are 5 projects now */
                  md:h-full md:w-1/5
                  md:hover:w-[35%] 
                  
                  transition-all duration-500 ease-in-out
                  shadow-sm md:shadow-none
                `}
              >
                {/* Background Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 md:opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                  {/* Location & Details Wrapper */}
                  <div className="transform transition-transform duration-500 md:translate-y-4 md:group-hover:translate-y-0">
                    {/* Top Tag: Location */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3 h-3 text-[#C5A059]" />
                      <span className="text-[#C5A059] text-[10px] md:text-xs font-bold uppercase tracking-wider truncate">
                        {project.location}
                      </span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="w-full">
                        {/* Title */}
                        <h3 className="text-lg md:text-3xl font-bold text-white mb-1 leading-tight">
                          {project.title}
                        </h3>

                        {/* Subtitle & Price (Mobile: Always Visible / Desktop: Hover Only) */}
                        <div
                          className="
                            overflow-hidden 
                            /* Mobile: Visible by default */
                            max-h-[100px] opacity-100
                            /* Desktop: Hidden until hover */
                            md:max-h-0 md:opacity-0 
                            md:group-hover:max-h-[100px] md:group-hover:opacity-100
                            transition-all duration-500 ease-in-out
                          "
                        >
                          <p className="text-gray-300 text-[10px] md:text-sm font-light leading-snug mb-1 md:mb-2 line-clamp-2 md:line-clamp-none">
                            {project.subtitle}
                          </p>
                          <p className="text-white text-sm md:text-lg font-bold">
                            {project.price}
                          </p>
                        </div>
                      </div>

                      {/* Arrow Icon (Desktop Only) */}
                      <div
                        className="
                        hidden md:block
                        bg-[#C5A059] 
                        p-3 rounded-full 
                        text-black 
                        transform translate-x-10 opacity-0 
                        group-hover:translate-x-0 group-hover:opacity-100 
                        transition-all duration-500 delay-100
                      "
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Border Separator (Desktop Only) */}
                <div className="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-white/20 z-10" />
              </MotionLink>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ExploreProjects;
