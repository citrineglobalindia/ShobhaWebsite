"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  X,
  CheckCircle2,
  Loader2,
  Building2,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
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
    image: "/one-world/night-elevation.jpg",
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
  {
    id: 5,
    title: "SOBHA Boulevard Mysore Plots",
    slug: "/sobha-premium-villa-plots",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775664046/hero_1_urnb1g.jpg",
    location: "Near Infosys Mysore",
    basePrice: "Pre-Launch: ₹----/sq.ft*",
    configs: [
      { type: "Premium Plot", size: "1200 Sq. Ft." },
      { type: "Premium Plot", size: "1500 Sq. Ft." },
      { type: "Premium Plot", size: "1800 Sq. Ft." },
      { type: "Premium Plot", size: "2400 Sq. Ft." },
    ],
  },
  // --- ADDED NEW SOBHA ONE WORLD DATA ---
  {
    id: 6,
    title: "Sobha One World - New",
    slug: "/sobha-one-word",
    image:
      "https://res.cloudinary.com/djxsxevds/image/upload/v1779463339/mainplan_v05icr.webp",
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
];

const EnquiryModel = ({ isOpen, onClose, defaultProjectName = "" }) => {
  const router = useRouter();
  const pathname = usePathname();

  // --- STATE ---
  const [activeProject, setActiveProject] = useState(PROJECT_DATA[0]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProjectLocked, setIsProjectLocked] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    selectedConfig: "",
    visitDate: "",
  });

  // --- INITIALIZATION ---
  useEffect(() => {
    if (isOpen) {
      const currentPageProject = PROJECT_DATA.find((p) => p.slug === pathname);
      if (currentPageProject) {
        setActiveProject(currentPageProject);
        setIsProjectLocked(true);
      } else {
        const initial =
          PROJECT_DATA.find((p) => p.title === defaultProjectName) ||
          PROJECT_DATA[0];
        setActiveProject(initial);
        setIsProjectLocked(false);
      }
      // Reset form including email
      setFormState({
        name: "",
        email: "",
        phone: "",
        selectedConfig: "",
        visitDate: "",
      });
      setStep(1);
      setIsSuccess(false);
    }
  }, [isOpen, defaultProjectName, pathname]);

  const handleProjectChange = (e) => {
    if (isProjectLocked) return;
    const selected = PROJECT_DATA.find((p) => p.title === e.target.value);
    setActiveProject(selected);
    setFormState((prev) => ({ ...prev, selectedConfig: "" }));
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleConfigSelect = (configString) => {
    setFormState({ ...formState, selectedConfig: configString });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    // Removed email requirement to proceed to step 2
    if (formState.name && formState.phone) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentUrl =
      typeof window !== "undefined" ? window.location.href : pathname;
    const timestamp = new Date().toISOString();
    const sourceString = `Enquiry from Page: ${pathname}`;

    // Fallback if email is not provided
    const userEmail = formState.email.trim() || "Not Provided";

    // 1. API Payload
    const apiPayload = {
      name: formState.name,
      email: userEmail,
      phone: formState.phone,
      project_name: activeProject.title,
      configuration_type: formState.selectedConfig || "Not Selected",
      preferred_visit_date: formState.visitDate || "Not Selected",
      timestamp: timestamp,
      source: `${sourceString} [Full URL: ${currentUrl}]`,
    };

    // Brevo email notification (server-side) -> waytonest01@gmail.com
    try {
      fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      }).catch(function () {});
    } catch (e) {}

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
      project_name: activeProject.title,
      config_type: formState.selectedConfig || "Not Selected",
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

      // Promises with silent catch blocks to prevent overall failure
      // LeadRat CRM (forwarded server-side so the API key stays private)
      const leadRatPromise = fetch("/api/leadrat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      }).catch((err) => console.warn("LeadRat Silently Failed:", err));

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

      // EmailJS notification removed (was sent from cdevng2@gmail.com).
      // Brevo (/api/send-enquiry) sends the notification from enquiry@sobha-specialoffers.com.

      // Execute all 3 requests concurrently
      await Promise.all([
        leadRatPromise,
        apiPromise,
        customEmailApiPromise,
      ]);

      handleSuccessFlow();
    } catch (error) {
      // This will only fire if something critically fails outside of the network requests
      console.error("Critical Submission Error:", error);
      handleSuccessFlow();
    }
  };

  const handleSuccessFlow = () => {
    setIsSubmitting(false);
    setIsSuccess(true);

    // --- STORE DATA FOR THANK YOU PAGE ---
    const conversionData = {
      projectName: activeProject.title,
      type: "enquiry", // Different from brochure
      file: "", // No file download for general enquiry
    };

    sessionStorage.setItem("lastConversion", JSON.stringify(conversionData));

    // --- REDIRECT TO CLEAN URL ---
    setTimeout(() => {
      onClose();
      // Redirects to: /sobha-ayana/thank-you (or whichever project is active)
      router.push(`${activeProject.slug}/thank-you`);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 font-sans">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg md:max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-[600px]"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-50 p-2 bg-white/80 hover:bg-white text-slate-800 rounded-full transition-colors shadow-sm md:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Image */}
            <div className="relative w-full md:w-5/12 h-40 md:h-full bg-slate-100 shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white z-10">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 md:px-2.5 md:py-1 rounded bg-[#C5A059] text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-2 shadow-lg">
                  <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />{" "}
                  {activeProject.location.split(",")[0]}
                </div>
                <h3 className="text-xl md:text-3xl font-bold leading-tight mb-2">
                  {activeProject.title}
                </h3>
                <div className="inline-block border-l-4 border-[#C5A059] pl-3">
                  <p className="text-slate-300 text-[10px] md:text-xs uppercase tracking-wider font-medium">
                    Price
                  </p>
                  <p className="text-white font-bold text-lg md:text-xl">
                    {activeProject.basePrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col bg-white overflow-y-auto">
              {!isSuccess ? (
                <>
                  <div className="mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                      {step === 1 ? (
                        <User className="w-5 h-5 md:w-6 md:h-6 text-[#C5A059]" />
                      ) : (
                        <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#C5A059]" />
                      )}
                      {step === 1 ? "Contact Details" : "Preferences"}
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">
                      {step === 1
                        ? "We need this to confirm your appointment."
                        : "Customize your site visit experience."}
                    </p>
                  </div>
                  <div className="mb-4 md:mb-6">
                    <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 md:mb-2 block">
                      Interested In
                    </label>
                    <div
                      className={`relative ${
                        isProjectLocked ? "opacity-70" : ""
                      }`}
                    >
                      <Building2 className="absolute left-3 top-3 md:left-4 md:top-3.5 w-4 h-4 text-slate-400 z-10" />
                      <select
                        value={activeProject.title}
                        onChange={handleProjectChange}
                        disabled={isProjectLocked}
                        className={`w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 md:pl-10 md:py-3 text-sm text-slate-700 font-medium focus:border-[#C5A059] outline-none appearance-none transition-colors ${
                          isProjectLocked
                            ? "cursor-not-allowed bg-slate-100"
                            : "cursor-pointer hover:bg-slate-100"
                        }`}
                      >
                        {PROJECT_DATA.map((p) => (
                          <option key={p.id} value={p.title}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                      {!isProjectLocked && (
                        <ChevronDown className="absolute right-3 top-3.5 md:right-4 md:top-4 w-4 h-4 text-slate-400 pointer-events-none" />
                      )}
                    </div>
                  </div>
                  <form className="flex flex-col gap-3 md:gap-4 flex-1">
                    {step === 1 ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-3 md:space-y-4"
                      >
                        {/* Name Input */}
                        <div className="relative">
                          <User className="absolute left-3 top-3 md:left-4 md:top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your Name"
                            value={formState.name}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 md:pl-10 md:py-3 text-sm md:text-base text-slate-900 placeholder-slate-400 outline-none focus:border-[#C5A059] focus:bg-white transition-all"
                          />
                        </div>

                        {/* Email Input - Made Optional */}
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 md:left-4 md:top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address (Optional)"
                            value={formState.email}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 md:pl-10 md:py-3 text-sm md:text-base text-slate-900 placeholder-slate-400 outline-none focus:border-[#C5A059] focus:bg-white transition-all"
                          />
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 md:left-4 md:top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            pattern="[0-9]{10}"
                            placeholder="Mobile Number"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 md:pl-10 md:py-3 text-sm md:text-base text-slate-900 placeholder-slate-400 outline-none focus:border-[#C5A059] focus:bg-white transition-all"
                          />
                        </div>

                        <button
                          onClick={handleNextStep}
                          disabled={
                            !formState.name || !formState.phone // Removed !formState.email validation
                          }
                          className="w-full mt-2 md:mt-4 bg-[#0a1e38] text-white font-bold py-3 md:py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#C5A059] transition-all shadow-lg text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next Step <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col h-full"
                      >
                        <div className="flex-1 mb-4">
                          <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 md:mb-3 block">
                            Preferred Configuration
                          </label>
                          <div className="grid grid-cols-2 gap-2 max-h-[120px] md:max-h-[140px] overflow-y-auto pr-1">
                            {activeProject.configs.map((conf, idx) => {
                              const confString = `${conf.type} - ${conf.size}`;
                              const isSelected =
                                formState.selectedConfig === confString;
                              return (
                                <div
                                  key={idx}
                                  onClick={() => handleConfigSelect(confString)}
                                  className={`cursor-pointer p-2 md:p-3 rounded-md text-[10px] md:text-xs font-bold border text-center transition-all flex flex-col justify-center ${
                                    isSelected
                                      ? "bg-[#C5A059] text-white border-[#C5A059] shadow-md"
                                      : "bg-white text-slate-600 border-slate-200 hover:border-[#C5A059] hover:text-[#C5A059]"
                                  }`}
                                >
                                  <span>{conf.type}</span>
                                  <span
                                    className={`text-[9px] font-normal mt-0.5 ${
                                      isSelected
                                        ? "text-white/80"
                                        : "text-slate-400"
                                    }`}
                                  >
                                    {conf.size}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="relative mb-4 md:mb-6">
                          <Calendar className="absolute left-3 top-3 md:left-4 md:top-3.5 w-4 h-4 text-slate-400 z-10" />
                          <select
                            name="visitDate"
                            value={formState.visitDate}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 md:pl-10 md:py-3 text-xs md:text-sm text-slate-700 outline-none focus:border-[#C5A059] appearance-none cursor-pointer"
                          >
                            <option value="" disabled>
                              When should we call/schedule?
                            </option>
                            <option value="Immediately">Immediately</option>
                            <option value="Tomorrow Morning">
                              Tomorrow Morning
                            </option>
                            <option value="Tomorrow Evening">
                              Tomorrow Evening
                            </option>
                            <option value="Weekend">This Weekend</option>
                          </select>
                        </div>
                        <div className="flex gap-3 mt-auto">
                          <button
                            onClick={() => setStep(1)}
                            className="w-1/3 border border-slate-200 text-slate-600 font-bold py-2.5 md:py-3.5 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            <ArrowLeft className="w-4 h-4" /> Back
                          </button>
                          <button
                            onClick={handleSubmit}
                            disabled={!formState.selectedConfig || isSubmitting}
                            className="w-2/3 bg-[#C5A059] text-white font-bold py-2.5 md:py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#b08d4b] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            {isSubmitting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              "Confirm Request"
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 md:mb-6 text-green-600"
                  >
                    <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                    Request Sent!
                  </h3>
                  <p className="text-slate-500 text-sm md:text-base max-w-xs mx-auto mb-6">
                    Our team will contact you shortly to discuss <br />
                    <span className="font-bold text-slate-900">
                      {activeProject.title}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 animate-pulse">
                    Redirecting to Thank You page...
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default EnquiryModel;
