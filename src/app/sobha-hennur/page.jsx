import EnquirySection from "@/components/landingpages/altairPage/EnquirySection";
import SobhaHennurHero from "@/components/landingpages/hennurPage/SobhaHennurHero";
import AboutSobhaHennur from "@/components/landingpages/hennurPage/AboutSobhaHennur";
import HennurAmenities from "@/components/landingpages/hennurPage/HennurAmenities";
import HennurConfigs from "@/components/landingpages/hennurPage/HennurConfigs";
import HennurLocation from "@/components/landingpages/hennurPage/HennurLocation";
import React from "react";

export const metadata = {
  title: "Sobha Hennur Township | Premium 2, 3, 3.5 & 4 BHK on Hennur Main Road",
  description:
    "Sobha Hennur Township — a landmark 45-acre integrated township on Hennur Main Road, North Bangalore. Premium 2, 3, 3.5 & 4 BHK residences, ~1.3 lakh sq.ft clubhouse and 18+ acres of open spaces. Pre-launch enquiries now open.",
};

const Hennur = () => {
  return (
    <>
      <SobhaHennurHero />
      <AboutSobhaHennur />
      <HennurAmenities />
      <HennurConfigs />
      <HennurLocation />
      <EnquirySection defaultProjectName="Sobha Hennur Township" />
    </>
  );
};

export default Hennur;
