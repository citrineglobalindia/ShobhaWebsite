"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  ArrowUp,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Youtube, href: "#" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white pt-16 border-t border-gray-100 font-sans relative overflow-hidden">
      {/* --- BACKGROUND DECORATION --- */}
      <div
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769447541/shoba-req_iov6vv.jpg')`,
          backgroundPosition: "bottom center",
          backgroundSize: "cover",
          opacity: 0.05,
          filter: "grayscale(100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 100%)",
        }}
      />

      {/* --- TOP DECORATIVE BORDER --- */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent z-20 opacity-70" />

      <div className="max-w-8xl mx-auto px-6 lg:px-8 pb-4 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-8">
          {/* --- LEFT COLUMN: Brand & Contact (Span 7) --- */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Logo Section - UPDATED */}
            <div className="flex flex-col items-center lg:items-start group">
              <div className="relative w-40 h-12 hover:opacity-90 transition-opacity">
                <Image
                  src="https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769441277/New_SOBHA_Logo_black_jwp6rc.png"
                  alt="Sobha Logo"
                  fill
                  className="object-contain object-center lg:object-left"
                />
              </div>
              <span className="text-[10px] md:text-[10px] font-medium text-gray-500 uppercase tracking-wide mt-0.5 group-hover:text-[#C5A059] transition-colors">
                Authorized Channel Partner
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-gray-500 max-w-md leading-relaxed font-light">
              <strong className="text-gray-900 font-semibold block mb-1">
                Passion at Work.
              </strong>
              Redefining the art of living with world-class residential and
              commercial spaces since 1995.
            </p>

            {/* Contact Details Wrapper - UPDATED */}
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center lg:justify-start">
              {/* Address */}
              <div className="flex items-start gap-3 text-left">
                <div className="mt-1 p-1.5 bg-[#C5A059]/10 rounded-md shrink-0">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Marketed By
                  </h4>
                  <h5 className="text-sm font-bold text-gray-900 mb-1">
                    Way To Nest Pvt Ltd
                  </h5>
                  <address className="not-italic text-xs text-gray-600 font-medium leading-relaxed max-w-xs">
                    3478, Bhaskara Polyclinic, 2nd Cross, <br />
                    80 Feet Road, Kanakapura Main Rd, <br />
                    Near Vajrahalli, Opp. BDA Park, <br />
                    Raghuvanahalli, Bengaluru - 560109
                  </address>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="flex flex-col gap-2 items-center lg:items-start">
                <a
                  href="tel:9739612117"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#C5A059] transition-colors group"
                >
                  <div className="p-1.5 bg-gray-50 rounded-md group-hover:bg-[#C5A059]/10 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">+91 97396 12117</span>
                </a>
                <a
                  href="mailto:waytonest01@gmail.com"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#C5A059] transition-colors group"
                >
                  <div className="p-1.5 bg-gray-50 rounded-md group-hover:bg-[#C5A059]/10 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">info@waytonest.in</span>
                </a>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Connect (Span 5 - Pushed to Right) --- */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 lg:pt-2">
            {/* Heading with Decorative Line */}
            <div className="relative">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">
                Connect
              </h3>
              <div className="w-8 h-[2px] bg-[#C5A059] mt-2 mx-auto lg:mx-0 lg:ml-auto"></div>
            </div>

            <p className="text-sm text-gray-500 font-light max-w-xs">
              Follow our journey on social media for the latest updates and
              launches.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className="group relative w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full text-gray-500 hover:border-[#C5A059] hover:bg-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                  >
                    <Icon className="w-4 h-4 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="relative w-full bg-[#111] text-white py-5 z-20 border-t border-white/10">
        <div className="max-w-8xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
          {/* Copyright & Links */}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 text-center lg:text-left">
            <p className="text-[10px] text-gray-500 font-medium tracking-wide">
              © 2026 SOBHA LTD.
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              <Link
                href="https://citrineglobal.in"
                className="text-[10px] font-bold text-gray-400 hover:text-[#C5A059] uppercase tracking-wider transition-colors"
              >
                Designed By: Citrine Global
              </Link>
              <Link
                href="/privacy-policy"
                className="text-[10px] font-bold text-gray-400 hover:text-[#C5A059] uppercase tracking-wider transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 hover:border-[#C5A059]/50 hover:bg-[#C5A059]/10 transition-all duration-300"
          >
            <span className="text-[9px] font-bold text-gray-300 group-hover:text-[#C5A059] uppercase tracking-widest">
              Back to Top
            </span>
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-[#C5A059] transition-colors">
              <ArrowUp className="w-3 h-3 text-white group-hover:text-black" />
            </div>
          </button>
        </div>
      </div>

      {/* --- MOBILE SPACER (Fixed Bottom Bar Compensation) --- */}
      <div className="w-full h-20 lg:hidden bg-[#111]"></div>
    </footer>
  );
};

export default Footer;
