"use client";
import React, { useState } from "react";

import AmenitiesSectionOne from "@/components/sobhaOne/AmenitiesSectionOne";
import HeroSectionOne from "@/components/sobhaOne/heroOne/HeroSectionOne";
import OneEmporiumSection from "@/components/sobhaOne/OneEmporiumSection";
import ProjectOverviewSection from "@/components/sobhaOne/ProjectOverviewSection";
import UnitShowcaseSection from "@/components/sobhaOne/UnitShowcaseSection";
import MasterPlanSection from "@/components/sobhaOne/MasterPlanSection";
import FloorPlanSection from "@/components/sobhaOne/FloorPlanSection";
import GallerySectionOne from "@/components/sobhaOne/GallerySectionOne";
import InteriorSliderSection from "@/components/sobhaOne/InteriorSliderSection";
import LuxuryEnquirySection from "@/components/sobhaOne/contactLux/LuxuryEnquirySection";
import AutoGallerySlider from "@/components/sobhaOne/AutoGallerySlider";

const ShobaOneWord = () => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  return (
    <>
      <HeroSectionOne
        isEnquiryModalOpen={isEnquiryModalOpen}
        setIsEnquiryModalOpen={setIsEnquiryModalOpen}
      />
      <ProjectOverviewSection />
      <OneEmporiumSection />
      <AutoGallerySlider />
      <MasterPlanSection
        isEnquiryModalOpen={isEnquiryModalOpen}
        setIsEnquiryModalOpen={setIsEnquiryModalOpen}
      />
      <InteriorSliderSection />
      <FloorPlanSection
        isEnquiryModalOpen={isEnquiryModalOpen}
        setIsEnquiryModalOpen={setIsEnquiryModalOpen}
      />
      <UnitShowcaseSection />
      <AmenitiesSectionOne
        isEnquiryModalOpen={isEnquiryModalOpen}
        setIsEnquiryModalOpen={setIsEnquiryModalOpen}
      />
      <GallerySectionOne />
      <LuxuryEnquirySection />
    </>
  );
};

export default ShobaOneWord;
