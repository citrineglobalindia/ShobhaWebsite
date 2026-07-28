"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  X,
  CheckCircle2,
  Download,
  ChevronDown,
  LayoutGrid,
  MapPin,
  Building2,
  FileText,
  Loader2,
  User,
  Phone,
  Mail,
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
    brochureLink: "/brochure/sobha-altair.pdf",
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
    brochureLink: "/brochure/sobha-hoskote.pdf",
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
    brochureLink: "/brochure/sobha-town-park.pdf",
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
    brochureLink: "/brochure/sobha-ayana.pdf",
  },
  // --- ADDED NEW SOBHA ONE WORLD DATA ---
  {
    id: 5,
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
    brochureLink: "/brochure/sobha-one-world.pdf",
  },
];

const DownloadModal = ({ isOpen, onClose, defaultProjectName = "" }) => {
  const router = useRouter();
  const pathname = usePathname();

  // --- STATE ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedProject: "",
    selectedConfig: "",
  });

  const [activeProjectData, setActiveProjectData] = useState(PROJECT_DATA[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProjectLocked, setIsProjectLocked] = useState(false);

  // --- INITIALIZATION ---
  useEffect(() => {
    if (isOpen) {
      const currentPageProject = PROJECT_DATA.find((p) => p.slug === pathname);
      let projectToSet;
      if (currentPageProject) {
        projectToSet = currentPageProject;
        setIsProjectLocked(true);
      } else {
        projectToSet =
          PROJECT_DATA.find((p) => p.title === defaultProjectName) ||
          PROJECT_DATA[0];
        setIsProjectLocked(false);
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        selectedProject: projectToSet.title,
        selectedConfig: "",
      });
      setActiveProjectData(projectToSet);
      setIsSuccess(false);
    }
  }, [isOpen, defaultProjectName, pathname]);

  const handleProjectChange = (e) => {
    if (isProjectLocked) return;
    const newProjectName = e.target.value;
    const projectObj = PROJECT_DATA.find((p) => p.title === newProjectName);
    setFormData((prev) => ({
      ...prev,
      selectedProject: newProjectName,
      selectedConfig: "",
    }));
    setActiveProjectData(projectObj);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentUrl =
      typeof window !== "undefined" ? window.location.href : pathname;
    const timestamp = new Date().toISOString();
    const sourceString = `Brochure Download from: ${pathname}`;

    // Fallback if email is not provided
    const userEmail = formData.email.trim() || "Not Provided";

    // Prepare API payloads...
    const apiPayload = {
      name: formData.name,
      email: userEmail,
      phone: formData.phone,
      project_name: formData.selectedProject,
      configuration: formData.selectedConfig || "Not Selected",
      source: `${sourceString} [Full URL: ${currentUrl}]`,
      timestamp: timestamp,
    };

    const emailParams = {
      user_name: formData.name,
      user_email: userEmail,
      user_phone: formData.phone,
      project_name: formData.selectedProject,
      config_type: formData.selectedConfig || "Not Selected",
      visit_date: "BROCHURE DOWNLOAD (Immediate)",
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
      await Promise.all([apiPromise, customEmailApiPromise, emailPromise]);

      handleSuccessFlow();
    } catch (error) {
      // Will only fire on critical system failures outside the requests
      console.error("Critical Submission Error:", error);
      handleSuccessFlow();
    }
  };

  const handleSuccessFlow = () => {
    setIsSubmitting(false);
    setIsSuccess(true);

    // --- 1. AUTO DOWNLOAD LOGIC ---
    if (activeProjectData.brochureLink) {
      // Create a temporary link element to force download/open
      const link = document.createElement("a");
      link.href = activeProjectData.brochureLink;
      link.target = "_blank"; // Opens in new tab
      // Some browsers use this attribute to force download instead of view
      link.download = `${activeProjectData.title.replace(
        /\s+/g,
        "_",
      )}_Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // --- 2. Store Data for Thank You Page ---
    const conversionData = {
      projectName: formData.selectedProject,
      file: activeProjectData.brochureLink || "",
      type: "brochure",
    };
    sessionStorage.setItem("lastConversion", JSON.stringify(conversionData));

    // --- 3. Redirect to Thank You Page ---
    setTimeout(() => {
      onClose();
      // Constructs clean url: /sobha-ayana/thank-you
      router.push(`${activeProjectData.slug}/thank-you`);
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
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-white/80 hover:bg-white text-slate-800 rounded-full transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Image */}
            <div className="w-full md:w-2/5 relative h-40 md:h-auto shrink-0 bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectData.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeProjectData.image}
                    alt={activeProjectData.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C5A059] text-white text-[10px] font-bold uppercase tracking-wider mb-2 shadow-lg">
                  <MapPin className="w-3 h-3" />{" "}
                  {activeProjectData.location.split(",")[0]}
                </div>
                <h3 className="text-xl md:text-3xl font-bold leading-tight mb-2">
                  {activeProjectData.title}
                </h3>
                <div className="inline-block border-l-4 border-[#C5A059] pl-3">
                  <p className="text-slate-300 text-xs uppercase tracking-wider font-medium">
                    Price
                  </p>
                  <p className="text-white font-bold text-lg md:text-xl">
                    {activeProjectData.basePrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto bg-white">
              {!isSuccess ? (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1 text-[#C5A059]">
                      <FileText className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Document Request
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Download Brochure
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Complete the form to view the official PDF and receive
                      pricing details.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Project Select */}
                    <div
                      className={`relative group ${
                        isProjectLocked ? "opacity-70" : ""
                      }`}
                    >
                      <div className="absolute left-4 top-3.5 text-slate-400 z-10 pointer-events-none">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <select
                        name="selectedProject"
                        value={formData.selectedProject}
                        onChange={handleProjectChange}
                        disabled={isProjectLocked}
                        className={`w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-slate-700 font-medium focus:border-[#C5A059] outline-none appearance-none transition-colors ${
                          isProjectLocked
                            ? "cursor-not-allowed bg-slate-100"
                            : "cursor-pointer hover:bg-slate-100"
                        }`}
                      >
                        {PROJECT_DATA.map((proj) => (
                          <option key={proj.id} value={proj.title}>
                            {proj.title}
                          </option>
                        ))}
                      </select>
                      {!isProjectLocked && (
                        <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
                      )}
                    </div>

                    {/* Config Select */}
                    <div className="relative group">
                      <div className="absolute left-4 top-3.5 text-slate-400 z-10 pointer-events-none">
                        <LayoutGrid className="w-4 h-4" />
                      </div>
                      <select
                        name="selectedConfig"
                        required
                        value={formData.selectedConfig}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-slate-700 font-medium focus:border-[#C5A059] outline-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <option value="" disabled className="text-slate-400">
                          Select Configuration
                        </option>
                        {activeProjectData.configs.map((config, idx) => (
                          <option
                            key={idx}
                            value={`${config.type} - ${config.size}`}
                          >
                            {config.type} - {config.size}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>

                    <div className="h-[1px] bg-slate-100 my-1" />

                    {/* Name Input */}
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#C5A059] outline-none focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email Input - Made Optional */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address (Optional)"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#C5A059] outline-none focus:bg-white transition-all"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        placeholder="Mobile Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-[#C5A059] outline-none focus:bg-white transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={
                        isSubmitting || !formData.name || !formData.phone
                      }
                      className="mt-2 w-full bg-[#0a1e38] hover:bg-[#C5A059] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Processing...
                        </span>
                      ) : (
                        <>
                          Download Now <Download className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-slate-400 text-center">
                      By downloading, you agree to our Privacy Policy.
                    </p>
                  </form>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-sm"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    Success!
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-xs">
                    Your brochure for{" "}
                    <span className="text-[#C5A059] font-bold">
                      {formData.selectedProject}
                    </span>{" "}
                    is opening in a new tab...
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

export default DownloadModal;
