"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Car,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

// Premium content array
const features = [
  {
    icon: <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 text-[#d4af37]" />,
    title: "65,000 Sq. Ft. Retail",
    description:
      "A sprawling, SOBHA-managed emporium designed for premium, seamless shopping experiences.",
  },
  {
    icon: <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-[#d4af37]" />,
    title: "Curated Lifestyle",
    description:
      "Premium salons, high-end boutiques, and everyday luxury essentials just steps away.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-[#d4af37]" />,
    title: "Asset Appreciation",
    description:
      "High footfall retail significantly enhances project visibility and long-term property value.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-[#d4af37]" />,
    title: "Independent Access",
    description:
      "Separate architectural entrances ensure total privacy and security for the residential community.",
  },
  {
    icon: <Car className="w-6 h-6 md:w-7 md:h-7 text-[#d4af37]" />,
    title: "Expansive Parking",
    description:
      "Dedicated, abundant parking master-planned for residents, guests, and retail patrons.",
  },
];

const OneEmporiumSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Cinematic Parallax Background Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Navigation Handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  }, []);

  // Auto-Play Engine
  useEffect(() => {
    let intervalId;
    if (isAutoPlay && !isHovered) {
      intervalId = setInterval(() => {
        handleNext();
      }, 4500);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlay, isHovered, handleNext, activeIndex]);

  // Swipe/Drag Handler for the active card
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) handleNext();
    if (info.offset.x > swipeThreshold) handlePrev();
  };

  // Advanced 3D Coverflow Mathematics (Tightened)
  const getCardStyles = (index) => {
    const total = features.length;
    let diff = index - activeIndex;

    // Circular wrap-around math
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;

    const isActive = diff === 0;
    const isVisible = Math.abs(diff) <= 2;

    return {
      isActive,
      isVisible,
      // Tighter 3D Transform values:
      x: `calc(${diff * 75}% + ${diff * 5}px)`, // Reduced spread for tighter clustering
      rotateY: diff * -22, // Slightly less aggressive rotation
      z: Math.abs(diff) * -100, // Reduced Z-depth push
      scale: isActive ? 1 : 0.92,
      opacity: isActive ? 1 : isVisible ? 1 - Math.abs(diff) * 0.3 : 0,
      zIndex: 20 - Math.abs(diff),
      blur: isActive ? 0 : Math.abs(diff) * 1.5,
    };
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0a0806] flex flex-col pb-16 md:pb-20 overflow-hidden selection:bg-[#d4af37] selection:text-white"
    >
      {/* 1. Cinematic Parallax Image Banner (Reduced Height) */}
      <div className="relative w-full h-[40vh] min-h-[350px] overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-[130%] -top-[15%] z-0"
          style={{ y: backgroundY }}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/djxsxevds/image/upload/v1779463340/oneemporium_hhuira.webp')`,
            }}
          />
        </motion.div>

        {/* Heavy Vignette & Floor Gradients for Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0806]/80 via-[#0a0806]/40 to-[#0a0806] z-10 pointer-events-none mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* 2. Overlapping Content & 3D Slider */}
      <div
        className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Section Header (Tighter Margins) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <p className="text-[#d4af37] uppercase tracking-[0.25em] text-[9px] md:text-[11px] font-semibold">
              Curated Retail Experience
            </p>
            <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#fcfbf9] leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            One{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#ffffff] via-[#e6cc78] to-[#d4af37]">
              Emporium
            </span>
          </h2>
        </motion.div>

        {/* 3D Coverflow Container (Reduced Height) */}
        <div
          className="relative w-full h-[320px] md:h-[360px] flex items-center justify-center"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {features.map((feature, index) => {
            const {
              isActive,
              isVisible,
              x,
              rotateY,
              z,
              scale,
              opacity,
              zIndex,
              blur,
            } = getCardStyles(index);

            return (
              <motion.div
                key={index}
                onClick={() => !isActive && setActiveIndex(index)}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={isActive ? handleDragEnd : undefined}
                initial={false}
                animate={{
                  x,
                  rotateY,
                  z,
                  scale,
                  opacity,
                  zIndex,
                  filter: `blur(${blur}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 25,
                  mass: 0.8,
                }}
                // Reduced padding and max-widths for compactness
                className={`absolute w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] flex flex-col items-center text-center p-6 md:p-8 rounded-2xl backdrop-blur-xl transition-all duration-500
                  ${
                    isActive
                      ? "bg-gradient-to-b from-[#1a1511]/95 to-[#0a0806]/95 border border-[#d4af37]/40 shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] cursor-grab active:cursor-grabbing ring-1 ring-[#d4af37]/20"
                      : "bg-[#110f0d]/80 border border-white/5 cursor-pointer hover:border-[#d4af37]/30 hover:bg-[#1a1511]/90"
                  }
                `}
                style={{
                  pointerEvents: isVisible ? "auto" : "none",
                  transformOrigin: "center center",
                }}
              >
                {/* Subtle internal shine effect for the active card */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                )}

                {/* Glowing Icon Container (Compact) */}
                <div
                  className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-5 transition-all duration-700 ${isActive ? "bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]" : "bg-white/[0.02] border border-white/10"}`}
                >
                  {feature.icon}
                </div>

                <h3
                  className={`text-lg md:text-xl lg:text-2xl font-serif tracking-wide mb-2 md:mb-3 transition-colors duration-700 ${isActive ? "text-[#fcfbf9]" : "text-gray-400"}`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`text-[11px] md:text-xs lg:text-sm leading-relaxed font-light transition-colors duration-700 ${isActive ? "text-[#d1ccc5]" : "text-gray-600"}`}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Navigation & Pagination Array (Tighter Spacing) */}
        <div className="flex flex-col items-center mt-8 md:mt-10 space-y-5 relative z-40">
          <div className="flex items-center space-x-5 md:space-x-8">
            {/* Prev Button */}
            <button
              className="p-2.5 md:p-3 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-lg text-white/70 hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-white/[0.08] transition-all duration-300 group"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>

            {/* Elegant Dots Pagination */}
            <div className="flex justify-center items-center space-x-2.5 md:space-x-3">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-500 rounded-full ${
                    index === activeIndex
                      ? "w-6 md:w-8 h-1 md:h-1.5 bg-gradient-to-r from-[#e6cc78] to-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                      : "w-1 h-1 md:w-1.5 md:h-1.5 bg-white/20 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              className="p-2.5 md:p-3 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-lg text-white/70 hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-white/[0.08] transition-all duration-300 group"
              onClick={handleNext}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center gap-1.5 text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#d4af37] transition-colors"
          >
            {isAutoPlay ? (
              <Pause className="w-2.5 h-2.5" />
            ) : (
              <Play className="w-2.5 h-2.5" />
            )}
            {isAutoPlay ? "Auto-Sliding ON" : "Auto-Sliding OFF"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default OneEmporiumSection;
