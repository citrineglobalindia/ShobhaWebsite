"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  X,
  Loader2,
  CheckCircle,
  Mail,
  Phone,
  User,
  MapPin,
  Tag,
  Building2,
} from "lucide-react";

// --- DATA ---
const PROJECT_DATA = [
  {
    id: 1,
    title: "Sobha Altair",
    slug: "/sobha-altair",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg",
    location: "Sarjapur Road, Near Wipro, Bengaluru",
    basePrice: "₹ 17,500/sqft*",
    configs: [
      { type: "Limited 2 BHK", size: "1500 Sqft" },
      { type: "3 BHK", size: "1875 Sqft" },
      { type: "3 BHK + Study", size: "2250 Sqft" },
      { type: "4 BHK", size: "2400 Sqft" },
      { type: "4 BHK + Garden", size: "2550 Sqft" },
    ],
  },
  {
    id: 2,
    title: "Sobha One World",
    slug: "/sobha-hoskote",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/hoskote_cxdrzp.jpg",
    location: "Hoskote, East Bengaluru",
    basePrice: "Price not available yet",
    configs: [
      { type: "Limited 2 BHK", size: "1500 Sqft (2 Units)" },
      { type: "3 BHK", size: "1875 Sqft" },
      { type: "3 BHK + Study", size: "2250 Sqft" },
      { type: "4 BHK", size: "2400 Sqft" },
      { type: "4 BHK + Garden", size: "2550 Sqft" },
    ],
  },
  {
    id: 3,
    title: "Sobha Town Park",
    slug: "/sobha-town-park",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/townpark_gydga7.jpg",
    location: "Hosur road - near Narayan Hrudayala Hospital, Bengaluru",
    basePrice: "Starts ₹1.72 Cr*",
    configs: [
      { type: "2BHK Medium", size: "1240 Sqft" },
      { type: "2BHK Large", size: "1339 Sqft" },
      { type: "3BHK Medium", size: "1514 Sqft" },
      { type: "3BHK Large", size: "1842 Sqft" },
      { type: "4BHK Medium", size: "2203 Sqft" },
      { type: "4BHK Large", size: "2800 Sqft" },
    ],
  },
  {
    id: 4,
    title: "Sobha Ayana",
    slug: "/sobha-ayana",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442585/ayna_rgsfz3.jpg",
    location: "Panathur Road, Bengaluru",
    basePrice: "Starts ₹2.3 Cr*",
    configs: [
      { type: "3 BHK [2T]", size: "1553 Sqft" },
      { type: "3 BHK [3T]", size: "1789 Sqft" },
    ],
  },
  // --- ADDED VILLA PLOTS DATA ---
  {
    id: 5,
    title: "SOBHA Boulevard Mysore Plots",
    slug: "/sobha-premium-villa-plots",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775663480/hero_pwblvw.jpg",
    location: "Near Infosys Campus Mysore",
    basePrice: "Pre-Launch: ₹----/sq.ft*",
    configs: [
      { type: "Premium Plot 1200 Sq. Ft", size: "1200 Sq. Ft." },
      { type: "Premium Plot 1500 Sq. Ft", size: "1500 Sq. Ft." },
      { type: "Premium Plot 1800 Sq. Ft", size: "1800 Sq. Ft." },
      { type: "Premium Plot 2400 Sq. Ft.", size: "2400 Sq. Ft." },
    ],
  },
];

export default function AutoEnquiryWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // --- STATE ---
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    project: PROJECT_DATA[0].title,
    config: "",
    visitDate: "",
  });

  // Derived state for the currently selected project to show its image
  const activeProjectData =
    PROJECT_DATA.find((p) => p.title === formState.project) || PROJECT_DATA[0];

  // --- AUTO OPEN LOGIC ---
  useEffect(() => {
    // Check if the user has already seen the popup in this browser session
    const hasOpened = sessionStorage.getItem("autoEnquiryFired");

    if (!hasOpened) {
      // Set a timer for exactly 5 seconds (5000 milliseconds)
      const timer = setTimeout(() => {
        const currentProject = PROJECT_DATA.find((p) => p.slug === pathname);
        if (currentProject) {
          setFormState((prev) => ({ ...prev, project: currentProject.title }));
        }

        setIsOpen(true);
        // Mark as fired so it doesn't open again during this session
        sessionStorage.setItem("autoEnquiryFired", "true");
      }, 5000);

      // Cleanup timer if the component unmounts before 5 seconds
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentUrl =
      typeof window !== "undefined" ? window.location.href : pathname;
    const timestamp = new Date().toISOString();
    const sourceString = `Auto-Popup Enquiry: ${pathname}`;

    // Fallback if email is empty
    const userEmail = formState.email.trim() || "Not Provided";

    // 1. API Payload
    const apiPayload = {
      name: formState.name,
      email: userEmail,
      phone: formState.phone,
      project_name: formState.project,
      configuration_type: formState.config || "Not Selected",
      preferred_visit_date: formState.visitDate || "Not Selected",
      timestamp: timestamp,
      source: `${sourceString} [Full URL: ${currentUrl}]`,
    };

    // CR Portal (Stepstones) lead capture
    try {
      fetch("https://kjegcgnraahyubfnvqte.supabase.co/functions/v1/web-enquiry-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZWdjZ25yYWFoeXViZm52cXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzA1MzksImV4cCI6MjA5Nzk0NjUzOX0.EbuOY5ZW9Xyl6DbKUzwVxxwZqX012Pk2DP4gMp2WVc0", Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZWdjZ25yYWFoeXViZm52cXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzA1MzksImV4cCI6MjA5Nzk0NjUzOX0.EbuOY5ZW9Xyl6DbKUzwVxxwZqX012Pk2DP4gMp2WVc0" },
        body: JSON.stringify({ key: "shobha-c075fb521a", ...apiPayload }),
      }).catch(function () {});
    } catch (e) {}


    // 2. EmailJS Params
    const emailParams = {
      user_name: formState.name,
      user_email: userEmail,
      user_phone: formState.phone,
      project_name: formState.project,
      config_type: formState.config || "Not Selected",
      visit_date: `Site Visit: ${formState.visitDate || "Not Specified"}`,
      source_text: sourceString,
      source_url: currentUrl,
      submission_time: new Date().toLocaleString(),
    };

    try {
      // Endpoints
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
      const apiUrl = `${baseUrl}/v4/datacollect`;

      const emailEndpointBase = process.env.NEXT_PUBLIC_EMAIL_ENDPOINT;
      const customEmailApiUrl = `${emailEndpointBase}/v4/emailconnect`;

      // Promises with individual catch blocks to ensure they fail silently
      const apiPromise = fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      }).catch((err) => console.warn("API 1 Silently Failed:", err));

      const customEmailApiPromise = fetch(customEmailApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      }).catch((err) => console.warn("API 2 Silently Failed:", err));

      const emailPromise = emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          emailParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        )
        .catch((err) => console.warn("EmailJS Silently Failed:", err));

      // Execute all 3 requests concurrently. Even if one rejects, the others proceed,
      // and Promise.all resolves successfully because of the individual .catch blocks.
      await Promise.all([apiPromise, customEmailApiPromise, emailPromise]);

      setIsSubmitting(false);
      setIsSuccess(true);

      sessionStorage.setItem(
        "lastConversion",
        JSON.stringify({
          projectName: formState.project,
          type: "auto-enquiry",
          file: "",
        }),
      );

      setTimeout(() => {
        handleClose();
        router.push(`${activeProjectData.slug}/thank-you`);
      }, 1500);
    } catch (error) {
      // This overall catch block will only trigger if something goes catastrophically wrong outside network requests
      console.error("Critical Submission Error:", error);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
        router.push(`${activeProjectData.slug}/thank-you`);
      }, 1500);
    }
  };

  const activeConfigs = activeProjectData.configs || [];

  return (
    <>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 font-sans">
            {/* Dark Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Premium Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:h-[600px]"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 bg-white/90 hover:bg-white text-slate-800 rounded-full transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Dynamic Image Area */}
              <div className="relative w-full md:w-5/12 h-48 md:h-full bg-slate-900 shrink-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProjectData.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeProjectData.image}
                      alt={activeProjectData.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Luxurious Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e38]/95 via-[#0a1e38]/50 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Left Side Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 flex flex-col justify-end h-full">
                  <motion.div
                    key={`text-${activeProjectData.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#C5A059] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">
                      Premium Collection
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold leading-tight mb-2 tracking-tight">
                      {activeProjectData.title}
                    </h3>

                    <div className="flex flex-col gap-2 mt-4 border-l-2 border-[#C5A059] pl-4">
                      <div className="flex items-start gap-2 text-slate-200 text-xs md:text-sm">
                        <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <p>{activeProjectData.location}</p>
                      </div>
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <Tag className="w-4 h-4 text-[#C5A059] shrink-0" />
                        <p className="text-sm md:text-base">
                          {activeProjectData.basePrice}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right Side: Elegant Form */}
              <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col bg-white overflow-y-auto">
                {!isSuccess ? (
                  <>
                    <div className="mb-6 md:mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-[#0a1e38] tracking-tight">
                        Register Your Interest
                      </h2>
                      <p className="text-slate-500 text-sm mt-2">
                        Enter your details below to unlock exclusive pre-launch
                        offers, floor plans, and pricing for Sobha properties.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4 flex-1"
                    >
                      <div className="space-y-4">
                        {/* Name Input */}
                        <div className="relative">
                          <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="Full Name*"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-12 pr-4 py-3.5 text-sm md:text-base text-[#0a1e38] placeholder-slate-400 outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                          />
                        </div>

                        {/* Split Row for Email & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                              type="tel"
                              name="phone"
                              required
                              pattern="[0-9]{10}"
                              value={formState.phone}
                              onChange={handleChange}
                              placeholder="Phone Number*"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-12 pr-4 py-3.5 text-sm md:text-base text-[#0a1e38] placeholder-slate-400 outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                            />
                          </div>

                          <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <input
                              type="email"
                              name="email"
                              // Removed 'required' attribute to make it optional
                              value={formState.email}
                              onChange={handleChange}
                              placeholder="Email Address (Optional)"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-12 pr-4 py-3.5 text-sm md:text-base text-[#0a1e38] placeholder-slate-400 outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
                            />
                          </div>
                        </div>

                        {/* Split Row for Project & Config */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                            <select
                              name="project"
                              value={formState.project}
                              onChange={handleChange}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-12 pr-4 py-3.5 text-sm md:text-base text-[#0a1e38] outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all appearance-none cursor-pointer"
                            >
                              {PROJECT_DATA.map((p) => (
                                <option key={p.id} value={p.title}>
                                  {p.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="relative">
                            <select
                              name="config"
                              value={formState.config}
                              onChange={handleChange}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm md:text-base text-[#0a1e38] outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all appearance-none cursor-pointer"
                              required
                            >
                              <option value="" disabled>
                                Select Configuration*
                              </option>
                              {activeConfigs.map((c, i) => {
                                const configString = `${c.type} - ${c.size}`;
                                return (
                                  <option key={i} value={configString}>
                                    {c.type}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={
                          isSubmitting || !formState.name || !formState.phone
                        }
                        className="w-full mt-auto bg-[#0a1e38] hover:bg-[#C5A059] cursor-pointer text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-base uppercase tracking-wider"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Get VIP Access"
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-6 text-[#C5A059]"
                    >
                      <CheckCircle className="w-10 h-10" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-[#0a1e38] mb-3">
                      Request Successful
                    </h3>
                    <p className="text-slate-500 text-base max-w-sm mx-auto mb-6">
                      Thank you for your interest in{" "}
                      <span className="font-bold text-[#0a1e38]">
                        {activeProjectData.title}
                      </span>
                      . Our luxury property consultant will reach out shortly.
                    </p>
                    <p className="text-sm text-slate-400 animate-pulse">
                      Redirecting to exclusive details...
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
