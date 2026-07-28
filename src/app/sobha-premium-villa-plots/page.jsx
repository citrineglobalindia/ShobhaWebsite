import PlotsEnquirySection from "@/components/landingpages/plotsComp/extraSec/PlotsEnquirySection";
import PromoSection from "@/components/landingpages/plotsComp/extraSec/PromoSection";
import SobhaPlotsJourney from "@/components/landingpages/plotsComp/extraSec/SobhaPlotsJourney";
import SobhaVillaPlotsHero from "@/components/landingpages/plotsComp/heroSec/SobhaVillaPlotsHero";
import AboutSectionM from "@/components/landingpages/plotsComp/mainAboutsec/AboutSectionM";
import React from "react";

const PLots = () => {
  return (
    <>
      <SobhaVillaPlotsHero />
      <AboutSectionM />
      <SobhaPlotsJourney />
      <PromoSection />
      <PlotsEnquirySection />
    </>
  );
};

export default PLots;
