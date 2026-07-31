"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  User,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Download,
  CalendarDays,
  MapPin,
  ChevronDown,
  LayoutGrid,
  Building2,
} from "lucide-react";

// --- IMPORT BOTH MODALS ---
import DownloadModal from "@/components/ui/model/DownloadModal";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

// --- DATA ---
const PROJECT_DATA = [
  {
    id: 1,
    title: "Sobha Altair",
    slug: "/sobha-altair",
    location: "Sarjapur Road, Near Wipro",
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
    location: "Near ITPL, Bengaluru",
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
    location: "Panathur Road, Bengaluru",
    basePrice: "Starts ₹2.3 Cr*",
    configs: [
      { type: "3 BHK [2T]", size: "1553 Sqft" },
      { type: "3 BHK [3T]", size: "1789 Sqft" },
    ],
  },
];

const EnquirySection = ({ defaultProjectName = "" }) => {
  const router = useRouter();
  const pathname = usePathname();

  // --- STATES ---
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isProjectLocked, setIsProjectLocked] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    config: "",
    consent: false,
  });

  const [availableConfigs, setAvailableConfigs] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  // --- INITIALIZATION ---
  useEffect(() => {
    const currentPageProject = PROJECT_DATA.find((p) => p.slug === pathname);
    let targetProject;

    if (currentPageProject) {
      targetProject = currentPageProject;
      setIsProjectLocked(true);
    } else {
      targetProject =
        PROJECT_DATA.find((p) => p.title === defaultProjectName) ||
        PROJECT_DATA[0];
      setIsProjectLocked(false);
    }

    if (targetProject) {
      setFormState((prev) => ({
        ...prev,
        project: targetProject.title,
        config: "",
      }));
      setAvailableConfigs(targetProject.configs);
    }
  }, [pathname, defaultProjectName]);

  // --- HANDLERS ---
  const handleProjectChange = (e) => {
    if (isProjectLocked) return;
    const newProjectName = e.target.value;
    const projectObj = PROJECT_DATA.find((p) => p.title === newProjectName);
    setFormState((prev) => ({ ...prev, project: newProjectName, config: "" }));
    setAvailableConfigs(projectObj ? projectObj.configs : []);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";

    // Optional Email Validation: Only check format if user provides text
    if (
      formState.email.trim() &&
      !formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      newErrors.email = "Valid email is required";
    }

    if (!formState.phone.match(/^\d{10}$/))
      newErrors.phone = "Enter valid 10-digit number";
    if (!formState.config) newErrors.config = "Please select a configuration";
    if (!formState.consent) newErrors.consent = "Please accept terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- SUBMISSION LOGIC (CONCURRENT APIS + EMAILJS) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    const currentUrl =
      typeof window !== "undefined" ? window.location.href : pathname;
    const timestamp = new Date().toISOString();
    const sourceString = `Enquiry Section - Page: ${pathname}`;

    // Secure fallback string for blank entries
    const userEmail = formState.email.trim() || "Not Provided";

    // 1. API Payload (Internal DB)
    const apiPayload = {
      name: formState.name,
      email: userEmail,
      phone: formState.phone,
      project_name: formState.project,
      configuration: formState.config,
      source: `${sourceString} [Full URL: ${currentUrl}]`,
      timestamp: timestamp,
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
      project_name: formState.project,
      config_type: formState.config,
      visit_date: "Callback Request (From Footer Form)",
      source_text: sourceString,
      source_url: currentUrl,
      submission_time: new Date().toLocaleString(),
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
      const apiUrl = `${baseUrl}/v4/datacollect`;

      const emailEndpointBase = process.env.NEXT_PUBLIC_EMAIL_ENDPOINT;
      const customEmailApiUrl = `${emailEndpointBase}/v4/emailconnect`;

      // Promises with strategic silent catch handlers
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

      handleSuccess();
    } catch (error) {
      console.error("Critical Submission Error:", error);
      handleSuccess(); // Failsafe to proceed
    }
  };

  const handleSuccess = () => {
    setStatus("success");

    // 1. Identify current project to get SLUG
    const projectObj =
      PROJECT_DATA.find((p) => p.title === formState.project) ||
      PROJECT_DATA[0];

    // 2. Store Data in Session Storage (Keep URL Clean)
    const conversionData = {
      projectName: formState.project,
      type: "enquiry",
      file: "", // No file download here
    };
    sessionStorage.setItem("lastConversion", JSON.stringify(conversionData));

    // 3. Redirect to Clean URL
    setTimeout(() => {
      router.push(`${projectObj.slug}/thank-you`);
    }, 1500);
  };

  const currentProjectDetails = PROJECT_DATA.find(
    (p) => p.title === formState.project,
  );

  return (
    <section className="relative py-20 lg:py-28 bg-[#0a0a0a] font-sans overflow-hidden">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* --- LEFT: SALES PITCH --- */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div>
              <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
                Enquire Now
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Secure Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#F3E5AB]">
                  Dream Home
                </span>
              </h2>
            </div>

            <div className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 border-l-2 border-[#C5A059] pl-4 bg-white/5 p-4 rounded-r-lg">
              <p>
                Don't miss the opportunity to own a piece of{" "}
                <span className="text-white font-bold">
                  {formState.project}
                </span>
                .
              </p>
              <p className="text-sm mt-2 text-[#C5A059] font-medium">
                {currentProjectDetails?.basePrice}
              </p>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-400 text-sm font-medium">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              {currentProjectDetails?.location || "Bengaluru"}
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="group flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-black rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.4)] cursor-pointer"
              >
                <div className="p-1 bg-black/10 rounded-full group-hover:bg-[#C5A059]/20">
                  <Download className="w-5 h-5 font-bold" />
                </div>
                <span className="text-sm font-extrabold tracking-wide uppercase">
                  Get Brochure
                </span>
              </button>

              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-[#C5A059] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                <div className="p-1 bg-black/10 rounded-full group-hover:bg-white/30">
                  <CalendarDays className="w-5 h-5 font-bold" />
                </div>
                <span className="text-sm font-extrabold tracking-wide uppercase">
                  Schedule Visit
                </span>
              </button>
            </div>
          </div>

          {/* --- RIGHT: THE FORM CARD --- */}
          <div className="lg:w-1/2 w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-[#111111]/90 backdrop-blur-xl border border-[#C5A059]/30 p-8 md:p-10 rounded-2xl shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#C5A059] via-[#F3E5AB] to-[#C5A059]" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                  >
                    <div className="w-20 h-20 bg-[#C5A059]/20 rounded-full flex items-center justify-center border border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                      <CheckCircle2 className="w-10 h-10 text-[#C5A059]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Request Sent!
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Thank you for your interest in <br />
                        <span className="text-[#C5A059] font-semibold">
                          {formState.project}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mt-4 animate-pulse">
                        Redirecting to Thank You page...
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-white">
                        Get Exclusive Details
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Select project details to get a callback.
                      </p>
                    </div>

                    {/* 1. Project Selection */}
                    <div
                      className={`relative group ${
                        isProjectLocked ? "opacity-75" : ""
                      }`}
                    >
                      <div className="absolute left-4 top-3.5 text-gray-400 z-10 pointer-events-none">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <select
                        name="project"
                        value={formState.project}
                        onChange={handleProjectChange}
                        disabled={isProjectLocked}
                        className={`w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-sm text-white focus:border-[#C5A059] outline-none appearance-none transition-colors ${
                          isProjectLocked
                            ? "cursor-not-allowed bg-white/5 text-gray-400"
                            : "cursor-pointer hover:bg-white/5"
                        }`}
                      >
                        {PROJECT_DATA.map((p) => (
                          <option
                            key={p.id}
                            value={p.title}
                            className="text-black bg-white"
                          >
                            {p.title}
                          </option>
                        ))}
                      </select>
                      {!isProjectLocked && (
                        <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-gray-500 pointer-events-none" />
                      )}
                    </div>

                    {/* 2. Configuration Selection */}
                    <div className="relative group">
                      <div className="absolute left-4 top-3.5 text-gray-400 z-10 pointer-events-none">
                        <LayoutGrid className="w-4 h-4" />
                      </div>
                      <select
                        name="config"
                        value={formState.config}
                        onChange={handleChange}
                        className={`w-full bg-black/40 border ${
                          errors.config ? "border-red-500" : "border-white/10"
                        } rounded-lg pl-10 pr-4 py-3.5 text-sm text-white focus:border-[#C5A059] outline-none appearance-none cursor-pointer transition-colors hover:bg-white/5`}
                      >
                        <option value="" disabled className="text-gray-500">
                          Select Configuration
                        </option>
                        {availableConfigs.map((conf, idx) => (
                          <option
                            key={idx}
                            value={`${conf.type} - ${conf.size}`}
                            className="text-black bg-white"
                          >
                            {conf.type} ({conf.size})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>

                    {/* 3. Name Field */}
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`w-full bg-black/40 border ${
                          errors.name ? "border-red-500" : "border-white/10"
                        } rounded-lg pl-10 pr-4 py-3.5 text-white placeholder-gray-500 focus:border-[#C5A059] outline-none text-sm transition-colors`}
                      />
                    </div>

                    {/* 4. Email Field - Optional */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address (Optional)"
                        value={formState.email}
                        onChange={handleChange}
                        className={`w-full bg-black/40 border ${
                          errors.email ? "border-red-500" : "border-white/10"
                        } rounded-lg pl-10 pr-4 py-3.5 text-white placeholder-gray-500 focus:border-[#C5A059] outline-none text-sm transition-colors`}
                      />
                    </div>

                    {/* 5. Phone Field */}
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-gray-400 text-sm border-r border-white/10 pr-2 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        maxLength={10}
                        placeholder="Phone Number"
                        value={formState.phone}
                        onChange={handleChange}
                        className={`w-full bg-black/40 border ${
                          errors.phone ? "border-red-500" : "border-white/10"
                        } rounded-lg pl-20 pr-4 py-3.5 text-white placeholder-gray-500 focus:border-[#C5A059] outline-none text-sm transition-colors`}
                      />
                    </div>

                    {/* Consent */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center pt-0.5">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formState.consent}
                          onChange={handleChange}
                          className="peer appearance-none w-4 h-4 border border-white/30 rounded-sm bg-black/40 checked:bg-[#C5A059] checked:border-[#C5A059] transition-all"
                        />
                        <CheckCircle2 className="absolute w-3 h-3 text-black pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-1" />
                      </div>
                      <p
                        className={`text-[10px] leading-relaxed ${
                          errors.consent ? "text-red-400" : "text-gray-500"
                        } group-hover:text-gray-400 transition-colors`}
                      >
                        I authorize Sobha Ltd. to contact me via Phone/WhatsApp.
                        I agree to the{" "}
                        <span className="underline cursor-pointer hover:text-[#C5A059]">
                          Privacy Policy
                        </span>
                        .
                      </p>
                    </label>

                    {/* Submit Button */}
                    <button
                      disabled={status === "loading"}
                      className="w-full bg-[#C5A059] hover:bg-[#b08d4b] text-[#0a1e38] font-bold text-sm uppercase tracking-widest py-4 rounded-lg shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Processing...
                        </>
                      ) : (
                        <>
                          Request Callback <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- SHARED MODALS --- */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        defaultProjectName={formState.project}
      />

      <EnquiryModel
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        defaultProjectName={formState.project}
      />
    </section>
  );
};

export default EnquirySection;
