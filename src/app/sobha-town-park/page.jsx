import EnquirySection from "@/components/landingpages/altairPage/EnquirySection";
import AboutSobhaTownpark from "@/components/landingpages/townParkPage/AboutSobhaTownpark";
import ProjectGallery from "@/components/landingpages/townParkPage/ProjectGallery";
import SobhaTownParkHero from "@/components/landingpages/townParkPage/SobhaTownParkHero";
import TownparkAmenities from "@/components/landingpages/townParkPage/TownparkAmenities";
import TownparkLocation from "@/components/landingpages/townParkPage/TownparkLocation";
import React from "react";

import Head from "next/head";

const Park = () => {
  return (
    <>
      <SobhaTownParkHero />
      <AboutSobhaTownpark />
      <TownparkAmenities />
      <TownparkLocation />
      <ProjectGallery />
      <EnquirySection />
    </>
  );
};

export default Park;
