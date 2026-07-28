"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Home,
  Phone,
  Clock,
  Download,
  Sparkles,
} from "lucide-react";
import ExploreProjects from "@/components/hero/projectsPart/ExploreProjects";

const ThankYouContent = () => {
  const [data, setData] = useState({
    projectName: "Sobha Oneworld",
    fileLink: "",
    isBrochure: false,
    hasOpened: false,
  });

  useEffect(() => {
    // Check Session Storage for fresh conversion data
    const storedData = sessionStorage.getItem("lastConversion");

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setData((prev) => ({
          ...prev,
          projectName: parsed.projectName || "Sobha Oneworld",
          fileLink: parsed.file || "",
          isBrochure: parsed.type === "brochure",
        }));
      } catch (e) {
        console.error("Error parsing conversion data");
      }
      // Clear storage
      sessionStorage.removeItem("lastConversion");
    }
  }, []);

  // --- Auto-trigger download logic ---
  useEffect(() => {
    if (data.isBrochure && data.fileLink && !data.hasOpened) {
      const timer = setTimeout(() => {
        window.open(data.fileLink, "_blank");
        setData((prev) => ({ ...prev, hasOpened: true }));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data.isBrochure, data.fileLink, data.hasOpened]);

  return (
    <div className="min-h-screen bg-white font-sans pt-20">
      {/* --- HERO SECTION --- */}
      <div className="relative w-full py-24 flex items-center justify-center bg-gray-50/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4 max-w-2xl flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mb-8 shadow-xl"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-serif text-[#0a0806] mb-6">
            Request Received
          </h1>
          <p className="text-lg text-gray-600 font-light mb-10">
            Thank you for showing interest in{" "}
            <span className="font-bold text-[#d4af37]">{data.projectName}</span>
            . Our luxury concierge team has been notified.
          </p>

          {data.isBrochure && data.fileLink && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <a
                href={data.fileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a0806] hover:bg-[#d4af37] text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-lg"
              >
                <Download className="w-4 h-4" /> Download Brochure
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* --- TIMELINE SECTION --- */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-serif text-center mb-16">
          The Journey Ahead
        </h3>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {[
            {
              icon: <CheckCircle2 />,
              title: "Request Received",
              desc: "Your interest in Sobha Oneworld is secured.",
            },
            {
              icon: <Clock />,
              title: "Expert Review",
              desc: "A consultant is curating your preferred unit.",
            },
            {
              icon: <Phone />,
              title: "Concierge Call",
              desc: "Expect a call for a private preview.",
            },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-[#d4af37] mb-6 border border-gray-100 shadow-sm">
                {React.cloneElement(step.icon, { className: "w-6 h-6" })}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center gap-6">
          <Link
            href="/"
            className="px-8 py-4 border border-gray-200 text-gray-700 font-bold rounded-lg hover:border-[#d4af37] transition-all"
          >
            Return Home
          </Link>
          <a
            href="tel:+919902730474"
            className="px-8 py-4 bg-[#d4af37] text-white font-bold rounded-lg hover:bg-[#b8962f] transition-all"
          >
            Call Sales
          </a>
        </div>
      </div>
    </div>
  );
};

const ThankYouPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    }
  >
    <ThankYouContent />
    <ExploreProjects />
  </Suspense>
);

export default ThankYouPage;
