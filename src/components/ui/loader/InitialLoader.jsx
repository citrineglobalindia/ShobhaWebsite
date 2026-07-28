"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoader({ onComplete }) {
  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    // Adjust this time based on how long your GIF takes to play one loop
    const finishTimeout = setTimeout(() => {
      setShowExit(true);

      // Notify parent to show actual website content after exit animation
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000); // Wait for slide-up exit animation to finish
    }, 3500);

    return () => {
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!showExit && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          exit={{
            y: "-100%",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* --- Background Decorative Pattern (Subtle Luxury Grid) --- */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#ca8a04 1px, transparent 1px), linear-gradient(to right, #ca8a04 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          <div className="relative flex flex-col items-center z-10">
            {/* --- 1. Main Logo GIF --- */}
            {/* The text is inside the GIF, so we just display the image large and clear */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
            >
              {/* Optional: Soft Glow behind the GIF for premium feel */}
              <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-10 rounded-full"></div>

              <img
                src="/shoba.gif"
                alt="Sobha Loading"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* --- 2. Loading Progress Indicator --- */}
            <div className="mt-[-20px] w-full max-w-[150px] flex flex-col items-center gap-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs font-semibold text-yellow-700 tracking-[0.4em] uppercase"
              >
                Loading
              </motion.p>

              {/* Gold Progress Bar */}
              <div className="w-full h-[2px] bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="h-full w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
