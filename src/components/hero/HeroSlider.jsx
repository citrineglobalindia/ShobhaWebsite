"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Building2,
  ArrowLeft,
  LayoutGrid,
  Home,
  Clock,
  Loader2,
} from "lucide-react";

// --- DATA ---
const SLIDES = [
  {
    id: 1,
    slug: "/sobha-altair",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg",
    title: "Sobha Altair",
    subtitle: "The Pinnacle of Urban Luxury",
    location: "Sarjapur Road, Near Wipro, Bengaluru",
    basePrice: "₹ 17,500/sqft*",
    configs: [
      { type: "Limited 2 BHK", size: "1500 Sqft", price: "₹17,500/sqft" },
      { type: "3 BHK", size: "1875 Sqft", price: "₹17,500/sqft" },
      { type: "3 BHK + Study", size: "2250 Sqft", price: "₹17,500/sqft" },
      { type: "4 BHK", size: "2400 Sqft", price: "₹17,500/sqft" },
      { type: "4 BHK + Garden", size: "2550 Sqft", price: "₹17,500/sqft" },
    ],
  },
  {
    id: 2,
    slug: "/sobha-hoskote",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/hoskote_cxdrzp.jpg",
    title: "Sobha One World",
    subtitle: "Connected Living at Its Best",
    location: "Hoskote, East Bengaluru",
    basePrice: "Price not available yet",
    configs: [
      {
        type: "Limited 2 BHK",
        size: "1500 Sqft (2 Units)",
        price: "Call for Price",
      },
      { type: "3 BHK", size: "1875 Sqft", price: "Call for Price" },
      { type: "3 BHK + Study", size: "2250 Sqft", price: "Call for Price" },
      { type: "4 BHK", size: "2400 Sqft", price: "Call for Price" },
      { type: "4 BHK + Garden", size: "2550 Sqft", price: "Call for Price" },
    ],
  },
  {
    id: 3,
    slug: "/sobha-town-park",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/townpark_gydga7.jpg",
    title: "Sobha Town Park",
    subtitle: "NYC Inspired Manhattan Towers",
    location: "Hosur road - Near Narayan Hrudayala Hospital, Bengaluru",
    basePrice: "Starts ₹1.72 Cr*",
    configs: [
      { type: "2BHK Medium", size: "1240 Sqft", price: "₹1.72 Cr" },
      { type: "2BHK Large", size: "1339 Sqft", price: "₹1.90 Cr" },
      { type: "3BHK Medium", size: "1514 Sqft", price: "₹2.20 Cr" },
      { type: "3BHK Large", size: "1842 Sqft", price: "₹2.70 Cr" },
      { type: "4BHK Medium", size: "2203 Sqft", price: "₹3.30 Cr" },
      { type: "4BHK Large", size: "2800 Sqft", price: "₹4.20 Cr" },
    ],
  },
  {
    id: 4,
    slug: "/sobha-ayana",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442585/ayna_rgsfz3.jpg",
    title: "Sobha Ayana",
    subtitle: "Where Nature Meets Elegance",
    location: "Panathur Road, Bengaluru",
    basePrice: "Starts ₹2.3 Cr*",
    configs: [
      { type: "3 BHK [2T]", size: "1553 Sqft", price: "₹2.30 Cr Onwards" },
      { type: "3 BHK [3T]", size: "1789 Sqft", price: "₹2.55 Cr Onwards" },
    ],
  },
  // --- ADDED VILLA PLOTS DATA ---
  {
    id: 5,
    slug: "/sobha-premium-villa-plots",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775663480/hero_pwblvw.jpg",
    title: "Sobha Boulevard Mysore Plots",
    subtitle: "An Exclusive Limited Plotted Development",
    location: "Near Infosys Campus, Mysore",
    basePrice: "₹ ----/sq.ft*",
    configs: [
      { type: "Premium Plot", size: "1200 Sq. Ft.", price: "₹----/sq.ft*" },
      { type: "Premium Plot", size: "1500 Sq. Ft.", price: "₹----/sq.ft*" },
      { type: "Premium Plot", size: "1800 Sq. Ft.", price: "₹----/sq.ft*" },
      { type: "Premium Plot", size: "2400 Sq. Ft.", price: "₹----/sq.ft*" },
    ],
  },
];

const HeroSlider = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  // --- Form & Interaction States ---
  const [step, setStep] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    selectedConfig: null,
    callTime: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Auto-slide Logic ---
  useEffect(() => {
    if (!isHovered && step === 1) {
      const timer = setInterval(() => nextSlide(), 6000);
      return () => clearInterval(timer);
    }
  }, [current, isHovered, step]);

  const nextSlide = () => {
    setCurrent(current === SLIDES.length - 1 ? 0 : current + 1);
    if (step === 2) setStep(1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? SLIDES.length - 1 : current - 1);
    if (step === 2) setStep(1);
  };

  // --- Form Handlers ---
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleConfigSelect = (config) => {
    setFormState({ ...formState, selectedConfig: config });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    // Validate only required fields (Name & Phone). Email is optional.
    if (formState.name && formState.phone) {
      // Basic formatting check if email is provided
      if (
        formState.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
      ) {
        alert("Please enter a valid email address.");
        return;
      }
      setStep(2);
    } else {
      alert("Please fill in required details (Name, Phone) first.");
    }
  };

  // --- Final Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const timestamp = new Date().toISOString();
    const sourceString = "Hero Slider Enquiry";
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";

    // Identify current slide data for slug usage
    const activeSlide = SLIDES[current];

    // Fallback for optional email
    const userEmail = formState.email.trim() || "Not Provided";

    // 1. API Payload (Internal DB & Email API)
    const payload = {
      name: formState.name,
      phone: formState.phone,
      email: userEmail,
      project_name: activeSlide.title,
      configuration_type: formState.selectedConfig?.type || "Not Selected",
      configuration_size: formState.selectedConfig?.size || "",
      estimated_price: formState.selectedConfig?.price || "",
      preferred_call_time: formState.callTime,
      timestamp: timestamp,
      source: sourceString,
    };

    // Brevo email notification (server-side) -> waytonest01@gmail.com
    try {
      fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(function () {});
    } catch (e) {}

    // CR Portal (Stepstones) lead capture
    try {
      fetch("https://kjegcgnraahyubfnvqte.supabase.co/functions/v1/web-enquiry-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZWdjZ25yYWFoeXViZm52cXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzA1MzksImV4cCI6MjA5Nzk0NjUzOX0.EbuOY5ZW9Xyl6DbKUzwVxxwZqX012Pk2DP4gMp2WVc0", Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZWdjZ25yYWFoeXViZm52cXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNzA1MzksImV4cCI6MjA5Nzk0NjUzOX0.EbuOY5ZW9Xyl6DbKUzwVxxwZqX012Pk2DP4gMp2WVc0" },
        body: JSON.stringify({ key: "shobha-c075fb521a", ...payload }),
      }).catch(function () {});
    } catch (e) {}


    // 2. EmailJS Params
    const emailParams = {
      user_name: formState.name,
      user_email: userEmail,
      user_phone: formState.phone,
      project_name: activeSlide.title,
      config_type: `${formState.selectedConfig?.type} (${formState.selectedConfig?.size})`,
      visit_date: `Callback Time: ${formState.callTime}`,
      source_text: sourceString,
      source_url: currentUrl,
      submission_time: new Date().toLocaleString(),
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
      const apiUrl = `${baseUrl}/v4/datacollect`;

      const emailEndpointBase = process.env.NEXT_PUBLIC_EMAIL_ENDPOINT;
      const customEmailApiUrl = `${emailEndpointBase}/v4/emailconnect`;

      // Promises with silent catch blocks to prevent overall failure
      // LeadRat CRM (forwarded server-side so the API key stays private)
      const leadRatPromise = fetch("/api/leadrat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn("LeadRat Silently Failed:", err));

      const apiPromise = fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn("API 1 Silently Failed:", err));

      const customEmailApiPromise = fetch(customEmailApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn("API 2 Silently Failed:", err));

      // EmailJS notification removed (was sent from cdevng2@gmail.com).
      // Brevo (/api/send-enquiry) sends the notification from enquiry@sobha-specialoffers.com.

      // Execute all 3 requests concurrently
      await Promise.all([
        leadRatPromise,
        apiPromise,
        customEmailApiPromise,
      ]);

      // --- SUCCESS FLOW ---

      // 1. Store conversion data in Session Storage (keeps URL clean)
      const conversionData = {
        projectName: activeSlide.title,
        type: "enquiry",
        file: "",
      };
      sessionStorage.setItem("lastConversion", JSON.stringify(conversionData));

      // 2. Redirect to specific project Thank You page
      router.push(`${activeSlide.slug}/thank-you`);
    } catch (error) {
      console.error("Submission error:", error);

      // Fallback redirect logic on critical error outside network requests
      const conversionData = {
        projectName: activeSlide.title,
        type: "enquiry",
        file: "",
      };
      sessionStorage.setItem("lastConversion", JSON.stringify(conversionData));
      router.push(`${activeSlide.slug}/thank-you`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative w-full mt-[62px] h-[60vh] md:h-[80vh] min-h-[400px] bg-gray-900 overflow-hidden group font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- BACKGROUND SLIDER --- */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className={`object-cover object-center transition-transform duration-[10000ms] ease-linear ${
                  index === current ? "scale-110" : "scale-100"
                }`}
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="absolute z-20 inset-0 pointer-events-none">
        <div className="max-w-8xl mx-auto px-4 md:px-12 h-full flex flex-col justify-end md:justify-center pb-20 md:pb-0">
          <div className="w-full md:max-w-[420px] pointer-events-auto flex flex-col gap-6 md:gap-8">
            {/* 1. PROJECT INFO TEXT */}
            <div
              key={current}
              className="animate-in fade-in slide-in-from-left-8 duration-700 delay-100"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-sm bg-[#C5A059] text-black text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg">
                <MapPin className="w-3 h-3" />
                {SLIDES[current].location}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-2 drop-shadow-xl">
                {SLIDES[current].title}
              </h1>

              <div className="flex flex-col gap-1 border-l-4 border-[#C5A059] pl-4">
                <p className="text-gray-200 text-sm md:text-lg font-light tracking-wide opacity-90 drop-shadow-md">
                  {SLIDES[current].subtitle}
                </p>
                <p className="text-[#C5A059] text-sm md:text-lg font-bold">
                  {SLIDES[current].basePrice}
                </p>
              </div>
            </div>

            {/* 2. FORM SECTION (Desktop Only) */}
            <div
              className="hidden md:block w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <div className="mb-4 border-b border-white/10 pb-2">
                  <h3 className="text-md md:text-lg font-bold text-white flex items-center gap-2">
                    {step === 1 ? (
                      <Building2 className="w-5 h-5 text-[#C5A059]" />
                    ) : (
                      <Home className="w-5 h-5 text-[#C5A059]" />
                    )}
                    {step === 1 ? "Book a Site Visit" : "Select Configuration"}
                  </h3>
                  <p className="text-[11px] text-gray-300 pl-7">
                    Get exclusive pricing for{" "}
                    <span className="text-[#C5A059] font-semibold">
                      {SLIDES[current].title}
                    </span>
                  </p>
                </div>

                {/* --- STEP 1: USER DETAILS --- */}
                {step === 1 && (
                  <form
                    onSubmit={handleNextStep}
                    className="flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-300"
                  >
                    {/* Name Input */}
                    <div className="relative group">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-focus-within:text-[#C5A059] transition-colors" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 outline-none focus:border-[#C5A059] focus:bg-black/60 transition-all"
                      />
                    </div>

                    {/* Email Input (Made Optional) */}
                    <div className="relative group">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-focus-within:text-[#C5A059] transition-colors" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address (Optional)"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 outline-none focus:border-[#C5A059] focus:bg-black/60 transition-all"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="relative group">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-focus-within:text-[#C5A059] transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit number"
                        placeholder="Phone Number"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 outline-none focus:border-[#C5A059] focus:bg-black/60 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-1 w-full bg-[#C5A059] hover:bg-[#b08d4b] text-black font-bold py-2.5 rounded-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#C5A059]/20 text-sm uppercase tracking-wide"
                    >
                      Select Configuration <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* --- STEP 2: CONFIGURATION & TIME --- */}
                {step === 2 && (
                  <div className="animate-in slide-in-from-right duration-300">
                    <div className="max-h-[140px] overflow-y-auto pr-1 space-y-2 mb-3 scrollbar-thin scrollbar-thumb-[#C5A059] scrollbar-track-transparent">
                      {SLIDES[current].configs.map((config, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleConfigSelect(config)}
                          className={`
                            cursor-pointer p-2 md:p-3 rounded-md border transition-all duration-200 relative group/item
                            ${
                              formState.selectedConfig === config
                                ? "bg-[#C5A059]/20 border-[#C5A059]"
                                : "bg-black/20 border-white/10 hover:bg-black/40 hover:border-white/30"
                            }
                          `}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-white text-xs md:text-sm font-bold group-hover/item:text-[#C5A059] transition-colors">
                                {config.type}
                              </div>
                              <div className="text-gray-400 text-[10px] md:text-xs flex items-center gap-1">
                                <LayoutGrid className="w-3 h-3" /> {config.size}
                              </div>
                            </div>
                            <div className="text-[#C5A059] text-[10px] md:text-xs font-semibold text-right">
                              {config.price}
                            </div>
                          </div>
                          {formState.selectedConfig === config && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Call Time */}
                    <div className="relative group mb-4">
                      <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-focus-within:text-[#C5A059] transition-colors z-10" />
                      <select
                        name="callTime"
                        value={formState.callTime}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-sm text-white outline-none focus:border-[#C5A059] focus:bg-black/60 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-gray-500">
                          When should we call?
                        </option>
                        <option value="Immediately" className="text-black">
                          Immediately
                        </option>
                        <option
                          value="Morning (9 AM - 12 PM)"
                          className="text-black"
                        >
                          Morning (9 AM - 12 PM)
                        </option>
                        <option
                          value="Afternoon (12 PM - 4 PM)"
                          className="text-black"
                        >
                          Afternoon (12 PM - 4 PM)
                        </option>
                        <option
                          value="Evening (4 PM - 8 PM)"
                          className="text-black"
                        >
                          Evening (4 PM - 8 PM)
                        </option>
                      </select>
                      <div className="absolute right-3 top-3 pointer-events-none">
                        <ChevronLeft className="w-3 h-3 -rotate-90 text-gray-400" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setStep(1)}
                        className="w-1/3 bg-black/40 hover:bg-black/60 text-white border border-white/10 rounded-sm py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <ArrowLeft className="w-3 h-3" /> Back
                      </button>

                      <button
                        onClick={handleSubmit}
                        disabled={
                          !formState.selectedConfig ||
                          !formState.callTime ||
                          isSubmitting
                        }
                        className="w-2/3 bg-[#C5A059] hover:bg-[#b08d4b] text-black font-bold py-2 rounded-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin" />{" "}
                            Processing
                          </span>
                        ) : (
                          <>
                            Get Quote <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- NAVIGATION CONTROLS --- */}
      <div className="absolute bottom-4 right-4 md:bottom-12 md:right-12 z-30 flex gap-2 md:gap-3">
        <button
          onClick={prevSlide}
          className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-sm border border-white/10 text-white transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center bg-[#C5A059] hover:bg-[#b08d4b] shadow-lg shadow-[#C5A059]/20 rounded-sm text-black transition-all hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
