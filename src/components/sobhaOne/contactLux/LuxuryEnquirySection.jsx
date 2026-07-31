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
  MapPin,
  ChevronDown,
  LayoutGrid,
  Building2,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

// Adjusted PROJECT_DATA to include a slug for the redirect
const PROJECT_DATA = {
  title: "Sobha One World",
  slug: "sobha-one-word",
  location: "Greater Whitefield, Bengaluru",
  basePrice: "Signature Residences",
  configs: [
    { type: "1 BHK", size: "734 sq. ft." },
    { type: "2 BHK Luxe", size: "1,063 sq. ft." },
    { type: "2 BHK Grande", size: "1,204 sq. ft." },
    { type: "3 BHK Luxe", size: "1,510 sq. ft." },
    { type: "3 BHK Grande", size: "1,735 - 1,838 sq. ft." },
    { type: "4 BHK Luxe", size: "2,096 sq. ft." },
    { type: "4 BHK Grande", size: "2,415 sq. ft." },
  ],
};

const LuxuryEnquirySection = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Added email to state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    project: PROJECT_DATA.title,
    config: "",
    consent: false,
  });

  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

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
    if (!formState.name.trim()) newErrors.name = "Required";

    // Optional Email Validation: Only validate format if an email is provided
    if (formState.email.trim() && !formState.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Invalid Email";
    }

    if (!formState.phone.match(/^\d{10}$/)) newErrors.phone = "Invalid Number";
    if (!formState.config) newErrors.config = "Required";
    if (!formState.consent) newErrors.consent = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSuccess = () => {
    setStatus("success");

    // Store Data in Session Storage
    const conversionData = {
      projectName: formState.project,
      type: "enquiry",
      file: "",
    };
    sessionStorage.setItem("lastConversion", JSON.stringify(conversionData));

    // Redirect to Clean URL using the project slug
    setTimeout(() => {
      router.push(`/${PROJECT_DATA.slug}/thank-you`);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    const currentUrl =
      typeof window !== "undefined" ? window.location.href : pathname;
    const timestamp = new Date().toISOString();
    const sourceString = `Enquiry Section - Page: ${pathname}`;

    // Fallback for optional email
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
      // Endpoints
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
      const apiUrl = `${baseUrl}/v4/datacollect`;

      const emailEndpointBase = process.env.NEXT_PUBLIC_EMAIL_ENDPOINT;
      const customEmailApiUrl = `${emailEndpointBase}/v4/emailconnect`;

      // Promises with individual catch blocks to ensure they fail silently
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

      const emailPromise = emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          emailParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        )
        .catch((err) => console.warn("EmailJS Silently Failed:", err));

      // Execute all 3 requests concurrently
      await Promise.all([
        leadRatPromise,
        apiPromise,
        customEmailApiPromise,
        emailPromise,
      ]);

      handleSuccess();
    } catch (error) {
      // This will only trigger if something crashes completely outside the requests
      console.error("Critical Submission Error:", error);
      handleSuccess();
    }
  };

  return (
    <section
      id="enquire-now"
      className="relative py-12 lg:py-16 bg-[#fcfbf9] overflow-hidden border-t border-gray-100"
    >
      {/* --- ADVANCED BACKGROUND --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-[#d4af37]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#0a0806]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-28">
          {/* --- LEFT: BRAND STORY --- */}
          <div className="lg:w-1/2 space-y-12 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-[#d4af37]/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
                </span>
                <span className="text-[#d4af37] uppercase tracking-[0.3em] text-[10px] font-bold">
                  Priority Registration Open
                </span>
              </div>

              <h2 className="text-5xl md:text-8xl font-serif text-[#0a0806] leading-[0.9] tracking-tighter">
                The Legacy <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#8a6d1d] via-[#d4af37] to-[#8a6d1d]">
                  of Oneworld
                </span>
              </h2>

              <p className="text-gray-500 text-lg md:text-xl max-w-lg font-light leading-relaxed">
                Unlock 48 acres of unmatched craftsmanship. Where every detail
                is a testament to Sobha&apos;s "No Compromise" philosophy.
              </p>
            </motion.div>

            {/* TRUST BADGES */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100"
            >
              {[
                { icon: ShieldCheck, text: "Sobha Quality" },
                { icon: Zap, text: "East-Side Hub" },
                { icon: Sparkles, text: "Elite Clubhouse" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* --- RIGHT: THE ARCHITECTURAL FORM CARD --- */}
          <div className="lg:w-1/2 w-full max-w-md mx-auto relative group">
            {/* THE ADVANCED "CROWN" TOP BORDER */}
            <div className="absolute -top-1 left-0 w-full h-[6px] z-20 overflow-hidden rounded-t-full">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a6d1d] via-[#d4af37] to-[#8a6d1d]" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(212,175,55,0.2)] border border-gray-100 relative"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-3xl font-serif text-[#0a0806] mb-2">
                      Registration Complete
                    </h3>
                    <p className="text-gray-400">
                      Our relationship manager will contact you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="mb-10 text-center">
                      <h3 className="text-3xl md:text-4xl font-serif text-[#0a0806]">
                        Join the Elite
                      </h3>
                      <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mt-4" />
                    </div>

                    {/* FIELD: Project (Locked) */}
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
                      <input
                        disabled
                        value={formState.project}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 py-4 text-xs font-black uppercase tracking-widest text-gray-500 cursor-not-allowed outline-none"
                      />
                    </div>

                    {/* FIELD: Configuration */}
                    <div className="relative group">
                      <LayoutGrid
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.config ? "text-red-500" : "text-gray-400"} group-focus-within:text-[#d4af37] transition-colors`}
                      />
                      <select
                        name="config"
                        value={formState.config}
                        onChange={handleChange}
                        className={`w-full bg-white border ${errors.config ? "border-red-400" : "border-gray-200"} rounded-xl pl-12 pr-10 py-4 text-sm focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/5 outline-none appearance-none transition-all cursor-pointer`}
                      >
                        <option value="">Choose Unit Type</option>
                        {PROJECT_DATA.configs.map((c, i) => (
                          <option key={i} value={c.size}>
                            {c.type} ({c.size})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-hover:text-[#d4af37] transition-colors pointer-events-none" />
                    </div>

                    {/* FIELD: Name */}
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`w-full bg-white border ${errors.name ? "border-red-400" : "border-gray-200"} rounded-xl pl-12 py-4 text-sm focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/5 outline-none transition-all`}
                      />
                    </div>

                    {/* FIELD: Email (Made Optional) */}
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address (Optional)"
                        value={formState.email}
                        onChange={handleChange}
                        className={`w-full bg-white border ${errors.email ? "border-red-400" : "border-gray-200"} rounded-xl pl-12 py-4 text-sm focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/5 outline-none transition-all`}
                      />
                    </div>

                    {/* FIELD: Phone */}
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Mobile Number"
                        maxLength={10}
                        value={formState.phone}
                        onChange={handleChange}
                        className={`w-full bg-white border ${errors.phone ? "border-red-400" : "border-gray-200"} rounded-xl pl-12 py-4 text-sm focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/5 outline-none transition-all`}
                      />
                    </div>

                    {/* CONSENT BOX */}
                    <label className="flex items-start gap-3 pt-2 cursor-pointer group">
                      <div className="relative flex items-center pt-1">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formState.consent}
                          onChange={handleChange}
                          className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-[#d4af37] checked:border-[#d4af37] transition-all"
                        />
                        <CheckCircle2 className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none transition-opacity" />
                      </div>
                      <p
                        className={`text-[10px] leading-relaxed transition-colors ${errors.consent ? "text-red-500" : "text-gray-400"}`}
                      >
                        I authorize Sobha Ltd. to provide updates regarding
                        Oneworld via phone/SMS/WhatsApp.
                      </p>
                    </label>

                    {/* THE MAGNETIC "LIQUID" BUTTON */}
                    <button
                      disabled={status === "loading"}
                      className="relative w-full group/btn overflow-hidden bg-[#0a0806] py-5 rounded-2xl transition-all hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] active:scale-95 disabled:opacity-70"
                    >
                      {/* Button Shimmer Effect */}
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                      />

                      <div className="relative flex items-center justify-center gap-3">
                        {status === "loading" ? (
                          <Loader2 className="animate-spin w-5 h-5 text-[#d4af37]" />
                        ) : (
                          <>
                            <span className="text-white font-bold text-xs uppercase tracking-[0.3em]">
                              Schedule Preview
                            </span>
                            <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover/btn:translate-x-2 transition-transform" />
                          </>
                        )}
                      </div>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* FLOATING STATUS (Desktop Only) */}
            <div className="absolute -bottom-6 -right-6 hidden lg:block">
              <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                    Site Location
                  </p>
                  <p className="text-xs font-bold text-[#0a0806]">
                    Greater Whitefield
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryEnquirySection;
