import React from "react";
import Head from "next/head"; // 1. Import the Script component

import EnquirySection from "@/components/landingpages/altairPage/EnquirySection";
import AltairAmenities from "@/components/landingpages/altairPage/mainHero/AltairAmenities";
import AltairGallery from "@/components/landingpages/altairPage/mainHero/AltairGallery";
import AltairHero from "@/components/landingpages/altairPage/mainHero/AltairHero";
import AltairOverview from "@/components/landingpages/altairPage/mainHero/AltairOverview";

const Altair = () => {
  return (
    <>
      <AltairHero />
      <AltairOverview />
      <AltairAmenities />
      <AltairGallery />
      <EnquirySection />
    </>
  );
};

export default Altair;
