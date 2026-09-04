"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

const PROJECT = "Sobha Hennur Township";

const CONFIGS = [
  {
    type: "1 BHK",
    size: "Approx. 650–750 Sq.Ft.*",
    note: "Compact, efficient city living",
  },
  {
    type: "2 BHK",
    size: "Approx. 1,500 Sq.Ft.*",
    note: "Smart, spacious family living",
  },
  {
    type: "3 BHK",
    size: "Approx. 1,800–1,900 Sq.Ft.*",
    note: "Comfort for growing families",
  },
  {
    type: "3.5 BHK",
    size: "Approx. 2,100–2,230 Sq.Ft.*",
    note: "Enhanced space & premium living",
  },
  {
    type: "4 BHK",
    size: "Larger Premium Residences*",
    note: "For buyers seeking expansive living",
  },
];

const HennurConfigs = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <section className="relative py-20 bg-[#f7f8fa] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
            Homes at Hennur
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1e38] mb-4">
            Choose the Space That{" "}
            <span className="text-[#C5A059]">Fits Your Life</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From practical family living to expansive premium residences, the
            proposed mix of 1, 2, 3, 3.5 and 4 BHK homes gives you the flexibility
            to select a configuration aligned with your lifestyle and space
            requirements.
          </p>
        </div>

        {/* Config cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CONFIGS.map((c, idx) => (
            <motion.div
              key={c.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0a1e38] text-white flex items-center justify-center mb-5 group-hover:bg-[#C5A059] transition-colors">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#0a1e38] mb-1">{c.type}</h3>
              <p className="text-[#C5A059] font-semibold text-sm mb-3">
                {c.size}
              </p>
              <p className="text-gray-500 text-sm mb-6 flex-1">{c.note}</p>
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="inline-flex items-center gap-2 text-[#0a1e38] font-bold text-xs uppercase tracking-widest group-hover:text-[#C5A059] transition-colors"
              >
                Get Floor Plan <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 bg-[#0a1e38] rounded-2xl px-8 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Indicative pricing starts at{" "}
              <span className="text-[#C5A059]">₹1 Cr*+</span>
            </h3>
            <p className="text-gray-300 mt-1">
              Request the latest price sheet, floor plans and availability.
            </p>
          </div>
          <button
            onClick={() => setIsEnquiryOpen(true)}
            className="shrink-0 flex items-center gap-2 bg-[#C5A059] hover:bg-white text-[#0a1e38] font-bold px-8 py-4 rounded-sm uppercase text-sm tracking-widest transition-all"
          >
            Get Price &amp; Cost Sheet <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <EnquiryModel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProjectName={PROJECT}
      />
    </section>
  );
};

export default HennurConfigs;
