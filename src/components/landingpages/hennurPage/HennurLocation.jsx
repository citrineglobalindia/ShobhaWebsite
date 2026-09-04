"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Plane,
  Car,
  ShoppingBag,
  ArrowRight,
  Download,
} from "lucide-react";
import DownloadModal from "@/components/ui/model/DownloadModal";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

const PROJECT = "Sobha Hennur Township";

// Indicative travel times — validate exact route/time before publishing.
const LOCATION_DATA = [
  {
    category: "Work Hubs",
    icon: <Briefcase className="w-5 h-5" />,
    items: [
      { name: "Manyata Tech Park", time: "15–18 Mins*" },
      { name: "Hebbal / ORR", time: "~15 Mins*" },
      { name: "Kirloskar Business Park", time: "~15 Mins*" },
    ],
  },
  {
    category: "Connectivity",
    icon: <Car className="w-5 h-5" />,
    items: [
      { name: "Outer Ring Road", time: "~10 Mins*" },
      { name: "Upcoming Namma Metro Blue Line", time: "Nearby*" },
      { name: "Hebbal Flyover", time: "~15 Mins*" },
    ],
  },
  {
    category: "Airport & Travel",
    icon: <Plane className="w-5 h-5" />,
    items: [
      { name: "Kempegowda Int'l Airport", time: "~30 Mins*" },
      { name: "Airport Road / NH-44", time: "~20 Mins*" },
    ],
  },
  {
    category: "Social & Lifestyle",
    icon: <ShoppingBag className="w-5 h-5" />,
    items: [
      { name: "Nagawara / Elements Mall", time: "~12 Mins*" },
      { name: "Hennur Cross", time: "~05 Mins*" },
    ],
  },
];

const HennurLocation = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <section
      id="location"
      className="relative py-20 bg-white font-sans overflow-hidden text-slate-900"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
            A Strategic Address
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            The Center of North Bangalore{" "}
            <span className="text-[#C5A059]">Growth</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Positioned on Hennur Main Road, Sobha Hennur offers access to
            established employment, business and lifestyle destinations across
            North Bangalore, with future metro connectivity adding to the
            location story.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- LEFT: INTERACTIVE LIST --- */}
          <div>
            <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
              {LOCATION_DATA.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
                    activeCategory === idx
                      ? "bg-[#C5A059] text-white border-[#C5A059] shadow-lg shadow-[#C5A059]/30"
                      : "bg-white text-slate-500 border-slate-200 hover:border-[#C5A059] hover:text-[#C5A059]"
                  }`}
                >
                  {cat.icon} {cat.category}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[300px]">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                <span className="p-2 bg-white rounded-lg shadow-sm text-[#C5A059]">
                  {LOCATION_DATA[activeCategory].icon}
                </span>
                {LOCATION_DATA[activeCategory].category}
              </h3>

              <div className="space-y-6">
                {LOCATION_DATA[activeCategory].items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between border-b border-slate-200 pb-4 last:border-0 last:pb-0 group"
                  >
                    <span className="text-lg text-slate-600 group-hover:text-[#C5A059] transition-colors font-medium">
                      {item.name}
                    </span>
                    <span className="text-sm font-bold bg-white border border-slate-200 px-3 py-1 rounded text-[#C5A059] shadow-sm whitespace-nowrap">
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">
              *Travel times are indicative and subject to traffic and final
              route confirmation.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsDownloadOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#0a1e38] text-white font-bold py-4 rounded-sm hover:bg-[#C5A059] transition-all uppercase text-xs tracking-widest shadow-lg"
              >
                <Download className="w-4 h-4" /> Download Location Map
              </button>
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 border border-slate-300 text-slate-700 font-bold py-4 rounded-sm hover:border-[#C5A059] hover:text-[#C5A059] hover:bg-white transition-all uppercase text-xs tracking-widest"
              >
                <MapPin className="w-4 h-4" /> Schedule Visit
              </button>
            </div>
          </div>

          {/* --- RIGHT: MAP --- */}
          <div className="relative h-[500px] w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-xl group">
            <iframe
              src="https://www.google.com/maps?q=Hennur%20Main%20Road%2C%20Bengaluru&output=embed"
              className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-slate-200 shadow-2xl pointer-events-none">
              <h4 className="text-[#C5A059] font-bold text-sm uppercase mb-1">
                Prime Address
              </h4>
              <p className="text-slate-800 text-lg font-medium leading-snug">
                Sobha Hennur Township, <br />
                Hennur Main Road, <br />
                North Bangalore.
              </p>
              <div className="pointer-events-auto mt-3">
                <a
                  href="https://www.google.com/maps/search/Hennur+Main+Road,+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-[#C5A059] transition-colors font-bold uppercase tracking-wide cursor-pointer"
                >
                  Get Directions <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        defaultProjectName={PROJECT}
      />
      <EnquiryModel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProjectName={PROJECT}
      />
    </section>
  );
};

export default HennurLocation;
