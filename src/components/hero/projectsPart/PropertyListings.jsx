"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import EnquiryModel from "@/components/ui/model/EnquiryModel";

// --- FILTER TABS ---
const FILTERS = ["All", "Pre-Launch", "Newly Launched", "Ongoing", "Sold Out"];

// --- PROPERTY DATA (real Sobha projects) ---
const PROPERTIES = [
  {
    id: 1,
    title: "Sobha Ayana",
    status: "Newly Launched",
    location: "Panathur Road, Bengaluru",
    price: "₹2.3 Cr* Onwards",
    apartments: "3 BHK",
    unitSize: "1553 Sq.Ft. Onwards*",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769446295/ayna_fd8gam.png",
    href: "/sobha-ayana",
  },
  {
    id: 2,
    title: "Sobha Town Park",
    status: "Newly Launched",
    location: "Hosur Road, Bengaluru",
    price: "₹1.72 Cr* Onwards",
    apartments: "2, 3 & 4 BHK",
    unitSize: "1240 Sq.Ft. Onwards*",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769446932/shoba-req_1_ciglqr.jpg",
    href: "/sobha-town-park",
  },
  {
    id: 3,
    title: "Sobha Altair",
    status: "Ongoing",
    location: "Sarjapur Road, Near Wipro, Bengaluru",
    price: "₹17,500/Sq.Ft* Onwards",
    apartments: "2, 3 & 4 BHK",
    unitSize: "1500 Sq.Ft. Onwards*",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg",
    href: "/sobha-altair",
  },
  {
    id: 4,
    title: "Sobha One World",
    status: "Pre-Launch",
    location: "Hoskote, East Bengaluru",
    price: "Price On Request",
    apartments: "2, 3 & 4 BHK",
    unitSize: "1500 Sq.Ft. Onwards*",
    image: "/one-world/night-elevation.jpg",
    href: "/sobha-hoskote",
  },
  {
    id: 5,
    title: "Sobha Boulevard Mysore Plots",
    status: "Pre-Launch",
    location: "Near Infosys Campus, Mysore",
    price: "Price On Request",
    apartments: "Premium Plots",
    unitSize: "1200 Sq.Ft. Onwards*",
    image:
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1775664046/hero_1_urnb1g.jpg",
    href: "/sobha-premium-villa-plots",
  },
];

const PropertyListings = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");

  const filteredProperties = useMemo(() => {
    if (activeFilter === "All") return PROPERTIES;
    return PROPERTIES.filter((p) => p.status === activeFilter);
  }, [activeFilter]);

  const openEnquiry = (title) => {
    setSelectedProject(title);
    setIsModalOpen(true);
  };

  return (
    <section className="py-14 md:py-20 bg-[#f7f8fa]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* --- HEADER --- */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-[#C5A059] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1e38]">
            Featured Sobha Properties
          </h2>
        </div>

        {/* --- FILTER TABS --- */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mb-10 md:mb-14">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 md:px-7 py-2.5 rounded-md text-xs md:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-[#0a1e38] text-white border-[#0a1e38] shadow-md"
                    : "bg-white text-[#0a1e38] border-gray-200 hover:border-[#0a1e38]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4 }}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Image + Status ribbon */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute bottom-0 right-0 bg-[#0a1e38] text-white text-[11px] md:text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-tl-lg shadow-md">
                    {property.status}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-[#0a1e38] mb-1.5">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-500 mb-5">
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Price + Apartments */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[#0a1e38] font-bold text-sm mb-1">
                        Price
                      </p>
                      <p className="text-gray-600 text-sm">{property.price}</p>
                    </div>
                    <div>
                      <p className="text-[#0a1e38] font-bold text-sm mb-1">
                        Residential Apartments
                      </p>
                      <p className="text-gray-600 text-sm">
                        {property.apartments}
                      </p>
                    </div>
                  </div>

                  {/* Unit Size */}
                  <div className="mb-6">
                    <p className="text-[#0a1e38] font-bold text-sm mb-1">
                      Unit Size
                    </p>
                    <p className="text-gray-600 text-sm">{property.unitSize}</p>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Link
                      href={property.href}
                      className="text-center bg-[#0a1e38] hover:bg-[#C5A059] text-white text-sm font-semibold py-3 rounded-md transition-colors duration-300"
                    >
                      Book a Site Visit
                    </Link>
                    <button
                      onClick={() => openEnquiry(property.title)}
                      className="text-center bg-[#0a1e38] hover:bg-[#C5A059] text-white text-sm font-semibold py-3 rounded-md transition-colors duration-300 cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No properties currently in this category. Please check back soon.
            </p>
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      <EnquiryModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProjectName={selectedProject}
      />
    </section>
  );
};

export default PropertyListings;
