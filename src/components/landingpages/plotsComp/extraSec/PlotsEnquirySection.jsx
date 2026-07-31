"use client";

import React, { useState } from "react";
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
  TreePine,
} from "lucide-react";

// --- DATA CONFIGURATION FOR VILLA PLOTS ---
const PROJECT_DATA = [
  {
    id: 1,
    title: "SOBHA Boulevard Mysore Plots",
    slug: "/sobha-premium-villa-plots",
    location: "Near Express / Near Infosys Campus, Mysore",
    basePrice: "Pre-Launch: ₹----/sq.ft*",
    configs: [
      { type: "Premium Plot", size: "1200 Sq. Ft." },
      { type: "Premium Plot", size: "1500 Sq. Ft." },
      { type: "Premium Plot", size: "1800 Sq. Ft." },
      { type: "Premium Plot", size: "2400 Sq. Ft." },
    ],
  },
];

const PlotsEnquirySection = () => {
  const router = useRouter();
  const pathname = usePathname();

  // --- STATES ---
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    project: PROJECT_DATA[0].title,
    config: "",
    consent: false,
  });

  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const availableConfigs = PROJECT_DATA[0].configs;
  const currentProjectDetails = PROJECT_DATA[0];

  // --- HANDLERS ---
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
    if (!formState.config) newErrors.config = "Please select a plot size";
    if (!formState.consent) newErrors.consent = "Please accept terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToForm = () => {
    document
      .getElementById("register-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      document.getElementById("name-input")?.focus();
    }, 500);
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

    // 1. API Payload
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
      visit_date: "Callback Request (From Contact Form)",
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
      }).catch((e) => console.warn("API 1 connection closed seamlessly", e));

      const customEmailApiPromise = fetch(customEmailApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      }).catch((e) => console.warn("API 2 connection closed seamlessly", e));

      // EmailJS notification removed (was sent from cdevng2@gmail.com).
      // Brevo (/api/send-enquiry) sends the notification from enquiry@sobha-specialoffers.com.

      // Process parallel network requests concurrently
      await Promise.all([
        leadRatPromise,
        apiPromise,
        customEmailApiPromise,
      ]);

      handleSuccess();
    } catch (error) {
      console.error("Critical Execution Interrupted:", error);
      handleSuccess();
    }
  };

  const handleSuccess = () => {
    setStatus("success");

    const conversionData = {
      projectName: formState.project,
      type: "enquiry",
      file: "",
    };
    sessionStorage.setItem("lastConversion", JSON.stringify(conversionData));

    setTimeout(() => {
      router.push(`${currentProjectDetails.slug}/thank-you`);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-[#FAF9F6] font-sans overflow-hidden"
    >
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#059669]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* --- LEFT: SALES PITCH --- */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div>
              <span className="text-[#059669] font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center justify-center lg:justify-start gap-2">
                <TreePine className="w-4 h-4" /> Secure Your Plot
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#06170e] leading-tight tracking-tight">
                Invest In Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#10b981]">
                  Family's Legacy
                </span>
              </h2>
            </div>

            <div className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 border-l-4 border-[#059669] pl-5 bg-white p-5 rounded-r-xl shadow-sm">
              <p>
                Don't miss the exclusive pre-launch opportunity to own a piece
                of the highly anticipated{" "}
                <span className="text-gray-900 font-bold tracking-wide">
                  {formState.project}
                </span>
                .
              </p>
              <p className="text-sm md:text-base mt-3 text-[#059669] font-extrabold tracking-wide uppercase">
                {currentProjectDetails.basePrice}
              </p>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600 text-sm font-bold bg-white inline-flex px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
              <MapPin className="w-4 h-4 text-[#059669]" />
              {currentProjectDetails.location}
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={scrollToForm}
                className="group flex items-center gap-3 px-8 py-4 bg-[#059669] text-white rounded-full hover:bg-[#047857] hover:scale-105 transition-all duration-300 shadow-[0_10px_20px_rgba(5,150,105,0.2)] cursor-pointer"
              >
                <div className="p-1.5 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <Download className="w-4 h-4 font-bold" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase">
                  Get Brochure
                </span>
              </button>

              <button
                onClick={scrollToForm}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-[#06170e] rounded-full hover:border-[#059669] hover:text-[#059669] hover:scale-105 transition-all duration-300 border border-gray-200 shadow-sm cursor-pointer"
              >
                <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-emerald-50 group-hover:text-[#059669] transition-colors">
                  <CalendarDays className="w-4 h-4 font-bold" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase">
                  Schedule Visit
                </span>
              </button>
            </div>
          </div>

          {/* --- RIGHT: THE FORM CARD --- */}
          <div
            id="register-form"
            className="lg:w-1/2 w-full max-w-md mx-auto scroll-mt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(5,150,105,0.1)] ring-1 ring-gray-100"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#059669] via-[#10b981] to-[#059669] rounded-t-[2rem]" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-[#059669]/20 shadow-sm">
                      <CheckCircle2 className="w-10 h-10 text-[#059669]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                        Request Sent!
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Thank you for your interest in <br />
                        <span className="text-[#059669] font-bold">
                          {formState.project}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400 mt-6 animate-pulse uppercase tracking-widest font-bold">
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
                    <div className="mb-6">
                      <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Register Interest
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 font-medium">
                        Get priority access and pre-launch pricing.
                      </p>
                    </div>

                    {/* 1. Project Selection (Locked Visual) */}
                    <div className="relative group">
                      <div className="absolute left-4 top-3.5 text-[#059669] z-10 pointer-events-none">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <select
                        name="project"
                        value={formState.project}
                        disabled={true}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm font-bold text-gray-700 outline-none appearance-none cursor-not-allowed"
                      >
                        <option value={PROJECT_DATA[0].title}>
                          {PROJECT_DATA[0].title}
                        </option>
                      </select>
                    </div>

                    {/* 2. Configuration Selection */}
                    <div className="relative group">
                      <div className="absolute left-4 top-3.5 text-gray-400 z-10 pointer-events-none">
                        <LayoutGrid className="w-4 h-4 group-focus-within:text-[#059669] transition-colors" />
                      </div>
                      <select
                        name="config"
                        value={formState.config}
                        onChange={handleChange}
                        className={`w-full bg-[#FAF9F6] border ${
                          errors.config ? "border-red-400" : "border-gray-200"
                        } rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 focus:border-[#059669] focus:bg-white focus:ring-4 focus:ring-[#059669]/10 outline-none appearance-none cursor-pointer transition-all`}
                      >
                        <option value="" disabled className="text-gray-500">
                          Select Plot Size
                        </option>
                        {availableConfigs.map((conf, idx) => (
                          <option
                            key={idx}
                            value={`${conf.size}`}
                            className="text-gray-900 font-medium"
                          >
                            {conf.type} ({conf.size})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* 3. Name Field */}
                    <div className="relative group">
                      <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#059669] transition-colors" />
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`w-full bg-[#FAF9F6] border ${
                          errors.name ? "border-red-400" : "border-gray-200"
                        } rounded-xl pl-11 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#059669] focus:bg-white focus:ring-4 focus:ring-[#059669]/10 outline-none text-sm transition-all`}
                      />
                    </div>

                    {/* 4. Email Field - Configured to Optional */}
                    <div className="relative group">
                      <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#059669] transition-colors" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address (Optional)"
                        value={formState.email}
                        onChange={handleChange}
                        className={`w-full bg-[#FAF9F6] border ${
                          errors.email ? "border-red-400" : "border-gray-200"
                        } rounded-xl pl-11 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#059669] focus:bg-white focus:ring-4 focus:ring-[#059669]/10 outline-none text-sm transition-all`}
                      />
                    </div>

                    {/* 5. Phone Field */}
                    <div className="relative group">
                      <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#059669] transition-colors text-sm border-r border-gray-200 pr-2 flex items-center gap-1 font-medium">
                        <Phone className="w-3 h-3" /> +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        maxLength={10}
                        placeholder="Phone Number"
                        value={formState.phone}
                        onChange={handleChange}
                        className={`w-full bg-[#FAF9F6] border ${
                          errors.phone ? "border-red-400" : "border-gray-200"
                        } rounded-xl pl-20 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#059669] focus:bg-white focus:ring-4 focus:ring-[#059669]/10 outline-none text-sm transition-all`}
                      />
                    </div>

                    {/* Consent */}
                    <label className="flex items-start gap-3 cursor-pointer group mt-4">
                      <div className="relative flex items-center pt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formState.consent}
                          onChange={handleChange}
                          className="peer appearance-none w-4 h-4 border border-gray-300 rounded bg-white checked:bg-[#059669] checked:border-[#059669] transition-all cursor-pointer"
                        />
                        <CheckCircle2 className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-0.5 top-1" />
                      </div>
                      <p
                        className={`text-[10px] leading-relaxed ${
                          errors.consent ? "text-red-500" : "text-gray-500"
                        } transition-colors`}
                      >
                        I authorize SOBHA Ltd. and its representatives to
                        contact me via Phone, SMS, or WhatsApp. I agree to the{" "}
                        <span className="text-[#059669] font-semibold underline cursor-pointer">
                          Privacy Policy
                        </span>
                        .
                      </p>
                    </label>

                    {/* Submit Button */}
                    <button
                      disabled={status === "loading"}
                      className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm uppercase tracking-widest py-4 rounded-xl shadow-[0_5px_15px_rgba(5,150,105,0.3)] hover:shadow-[0_8px_20px_rgba(5,150,105,0.4)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Request <ArrowRight className="w-4 h-4" />
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
    </section>
  );
};

export default PlotsEnquirySection;
