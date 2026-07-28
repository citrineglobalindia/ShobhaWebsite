import EnquirySection from "@/components/landingpages/altairPage/EnquirySection";
import AboutSobhaAyana from "@/components/landingpages/ayanaPages/ayanaAbout/AboutSobhaAyana";
import SobhaAyanaJourney from "@/components/landingpages/ayanaPages/ayanaAbout/SobhaAyanaJourney";
import SobhaAyanaPlans from "@/components/landingpages/ayanaPages/maps/SobhaAyanaPlans";
import SobhaAyanaHero from "@/components/landingpages/ayanaPages/SobhaAyanaHero";
import React from "react";

import Head from "next/head";

const Ayana = () => {
  return (
    <>
      <SobhaAyanaHero />
      <AboutSobhaAyana />
      <SobhaAyanaJourney />
      <SobhaAyanaPlans />
      <EnquirySection />
    </>
  );
};

export default Ayana;
