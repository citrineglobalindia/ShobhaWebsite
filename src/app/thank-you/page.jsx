"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Home, Phone, Clock, Download } from "lucide-react";
import ExploreProjects from "@/components/hero/projectsPart/ExploreProjects";

// --- COMPONENT CONTENT ---
const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const projectName = searchParams.get("project") || "Sobha Projects";
  const isBrochure = searchParams.get("type") === "brochure";
  const fileLink = searchParams.get("file");

  const [hasOpened, setHasOpened] = useState(false);

  // --- 1. Auto-trigger download logic ---
  useEffect(() => {
    // Only try to open if it's a brochure, we have a link, and haven't tried yet
    if (isBrochure && fileLink && !hasOpened) {
      const timer = setTimeout(() => {
        window.open(fileLink, "_blank");
        setHasOpened(true);
      }, 1000); // 1 second delay to allow UI to load first
      return () => clearTimeout(timer);
    }
  }, [isBrochure, fileLink, hasOpened]);

  return (
    <>
      {/* Added pt-20 here to account for your fixed header.
         If your header is taller, change to pt-24 or pt-28.
      */}
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#C5A059] selection:text-white pt-18">
        {/* --- HERO SECTION --- */}
        {/* Changed h-[50vh] to min-h-[50vh] to handle mobile text wrapping */}
        <div className="relative w-full min-h-[50vh] md:h-[60vh] flex items-center justify-center pb-10">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg"
              alt="Sobha Luxury"
              fill
              className="object-cover opacity-20 blur-[2px] scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center"
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="w-16 h-16 md:w-24 md:h-24 bg-[#C5A059] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(197,160,89,0.5)]"
            >
              <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-white" />
            </motion.div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
              Thank You
            </h1>
            <p className="text-base md:text-xl text-slate-200 font-medium px-4">
              We have received your request regarding{" "}
              <span className="text-[#C5A059] font-bold block md:inline mt-1 md:mt-0">
                {projectName}
              </span>
            </p>

            {/* --- MANUAL DOWNLOAD BUTTON (Mobile Friendly) --- */}
            {isBrochure && fileLink && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8"
              >
                <a
                  href={fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/80 hover:bg-[#C5A059] text-white rounded-full border border-white/20 text-sm font-semibold transition-all shadow-lg hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Brochure Again</span>
                </a>
                <p className="text-slate-200 text-[10px] mt-2">
                  (Click here if the download didn't start automatically)
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* --- TIMELINE & DETAILS SECTION --- */}
        {/* -mt-20 pulls the card up over the hero image. px-4 for mobile spacing. */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 md:-mt-20 relative z-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
          >
            {/* Timeline Header */}
            <div className="bg-[#0a1e38] p-6 md:p-8 text-center">
              <h2 className="text-white text-xl md:text-2xl font-bold">
                What Happens Next?
              </h2>
              <p className="text-slate-300 text-sm mt-2">
                Our dedicated sales team has been notified.
              </p>
            </div>

            {/* Timeline Steps */}
            <div className="p-6 md:p-10">
              <div className="space-y-10 md:space-y-0 md:flex md:justify-between relative">
                {/* Connecting Line (Desktop Only) */}
                <div className="hidden md:block absolute top-[24px] left-0 w-full h-0.5 bg-slate-100 z-0" />

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center text-center md:w-1/3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3 border-4 border-white shadow-sm ring-4 ring-slate-50 md:ring-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base md:text-lg">
                    Request Received
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-[200px] mx-auto">
                    Your details have been securely recorded in our system.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center text-center md:w-1/3">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3 border-4 border-white shadow-sm ring-4 ring-slate-50 md:ring-0">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base md:text-lg">
                    Expert Review
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-[200px] mx-auto">
                    An investment advisor is reviewing your preferences.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center text-center md:w-1/3">
                  <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059] mb-3 border-4 border-white shadow-sm ring-4 ring-slate-50 md:ring-0">
                    {isBrochure ? (
                      <Download className="w-6 h-6" />
                    ) : (
                      <Phone className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base md:text-lg">
                    {isBrochure ? "Brochure Viewed" : "Get in Touch"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-[200px] mx-auto">
                    {isBrochure
                      ? "The document should have opened in a new tab."
                      : "Expect a call within 2 hours."}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-slate-50 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-100">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 hover:border-[#C5A059] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Home className="w-4 h-4" /> Return to Home
              </Link>

              <a
                href="tel:+919902730474"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#0a1e38] text-white font-bold rounded-lg hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" /> Call Sales Team
              </a>
            </div>
          </motion.div>

          {/* Footer Note */}
          <p className="text-center text-slate-400 text-xs mt-8">
            &copy; {new Date().getFullYear()} Sobha Limited. All rights
            reserved.
          </p>
        </div>
      </div>
    </>
  );
};

// --- WRAPPER FOR SUSPENSE ---
const ThankYouPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A059]"></div>
        </div>
      }
    >
      <ThankYouContent />
      <ExploreProjects />
    </Suspense>
  );
};

export default ThankYouPage;
