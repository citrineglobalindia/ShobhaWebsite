"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  TrendingUp,
  MapPin,
  ArrowUpRight,
  Building2,
  Leaf,
} from "lucide-react";

const AboutSobhaHoskote = () => {
  const containerRef = useRef(null);

  // --- PARALLAX LOGIC ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values for parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 bg-[#0a0a0a] font-sans overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-8xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* --- LEFT COLUMN: CONTENT (Moves slightly up on scroll) --- */}
          <motion.div style={{ y: yText }} className="space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[2px] bg-[#C5A059]"></span>
                <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em]">
                  Project Vision
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Redefining <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#F3E5AB]">
                  East Bangalore
                </span>
              </h2>
            </motion.div>

            {/* Main Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-gray-400 text-lg leading-relaxed text-justify"
            >
              Sobha One World is a landmark 48-acre township designed for those
              who refuse to compromise. Positioned at the nexus of the{" "}
              <span className="text-white font-medium">
                Satellite Town Ring Road (STRR)
              </span>{" "}
              and the Bangalore-Chennai Expressway, it offers a lifestyle that
              blends the serenity of 60% open spaces with the pulse of urban
              connectivity.
            </motion.p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                "Luxury 3 & 4 BHK",
                "Neo-Bangalore Hub",
                "48-Acre Township",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 border border-white/10 rounded-full text-xs text-gray-300 font-medium tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* --- INVESTMENT INSIGHT CARD (Glassmorphism) --- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative mt-8 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059] to-transparent opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative bg-[#111] border border-[#C5A059]/30 p-8 rounded-xl overflow-hidden">
                {/* Decorative Line */}
                <div className="absolute top-0 left-0 w-[4px] h-full bg-[#C5A059]" />

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C5A059]/10 rounded-lg text-[#C5A059]">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Why Invest Here?
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Often termed <strong>"Neo-Bangalore"</strong>, Hoskote
                      offers a rare
                      <span className="text-[#C5A059]">
                        {" "}
                        First-Mover Advantage
                      </span>
                      . With massive infrastructure projects like the STRR
                      completion, property appreciation is projected to
                      outperform saturated markets like Whitefield.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- RIGHT COLUMN: PARALLAX IMAGERY --- */}
          <motion.div
            style={{ y: yImage }}
            className="relative h-[600px] w-full hidden lg:block"
          >
            {/* Main Image Layer */}
            <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/one-world/night-elevation.jpg"
                alt="Sobha One World Perspective"
                fill
                className="object-cover transition-transform duration-[2s] scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Floating Element 1: Status Badge (Moves faster) */}
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
              className="absolute -bottom-10 -left-10 z-20 bg-[#1a1a1a] border border-white/10 p-6 rounded-xl shadow-2xl backdrop-blur-xl max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Current Status
                </span>
              </div>
              <p className="text-2xl font-bold text-white">Pre-Launch</p>
              <p className="text-xs text-[#C5A059] mt-1">Accepting EOIs Now</p>
            </motion.div>

            {/* Floating Element 2: Location Highlight (Moves slower) */}
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, 40]) }}
              className="absolute -top-10 -right-10 z-0 w-64 h-40 bg-[#C5A059] rounded-2xl flex items-center justify-center p-6 shadow-[0_0_50px_rgba(197,160,89,0.3)]"
            >
              <div className="text-black text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="font-bold text-lg leading-tight">
                  Strategically Located
                </p>
                <p className="text-xs font-medium mt-1 opacity-80">
                  On Bangalore-Chennai Expy
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Image Fallback (Simple Layout) */}
          <div className="lg:hidden relative h-[400px] rounded-xl overflow-hidden mt-8 border border-white/10">
            <Image
              src="/one-world/night-elevation.jpg"
              alt="Sobha One World"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#C5A059]/30">
              <p className="text-[#C5A059] font-bold text-sm">Pre-Launch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSobhaHoskote;
