import EnquirySection from "@/components/landingpages/altairPage/EnquirySection";
import SobhaMullurHero from "@/components/landingpages/mullurPage/SobhaMullurHero";
import AboutSobhaMullur from "@/components/landingpages/mullurPage/AboutSobhaMullur";
import MullurHighlights from "@/components/landingpages/mullurPage/MullurHighlights";
import MullurAmenities from "@/components/landingpages/mullurPage/MullurAmenities";
import MullurConfigs from "@/components/landingpages/mullurPage/MullurConfigs";
import MullurLocation from "@/components/landingpages/mullurPage/MullurLocation";
import React from "react";

export const metadata = {
  title: "Sobha Mullur | 1, 2, 3 & 4 BHK on Sarjapur Road, Opposite Wipro",
  description:
    "Sobha Mullur — an upcoming 24-acre residential community by Sobha Limited on Sarjapur Road, opposite Wipro Office, Kodathi, Bengaluru. 11 wings, ~2,200 homes across 1, 2, 3 & 4 BHK configurations. Indicative pricing ~₹17,000/sq.ft. EOI & pre-launch registrations now open.",
};

const Mullur = () => {
  return (
    <>
      <SobhaMullurHero />
      <AboutSobhaMullur />
      <MullurHighlights />
      <MullurAmenities />
      <MullurConfigs />
      <MullurLocation />
      <EnquirySection defaultProjectName="Sobha Mullur" />
    </>
  );
};

export default Mullur;
