import EnquirySection from "@/components/landingpages/altairPage/EnquirySection";
import SobhaHennurHero from "@/components/landingpages/hennurPage/SobhaHennurHero";
import AboutSobhaHennur from "@/components/landingpages/hennurPage/AboutSobhaHennur";
import HennurMasterPlan from "@/components/landingpages/hennurPage/HennurMasterPlan";
import HennurAmenities from "@/components/landingpages/hennurPage/HennurAmenities";
import HennurConfigs from "@/components/landingpages/hennurPage/HennurConfigs";
import HennurLocation from "@/components/landingpages/hennurPage/HennurLocation";
import React from "react";

export const metadata = {
  title: "Sobha Hennur Township | Premium 2, 3, 3.5 & 4 BHK on Hennur Main Road",
  description:
    "Sobha Hennur Township — a landmark 50+ acre mixed-use township on Hennur Main Road, North Bangalore. 4,400+ residences across 12 wings, plus office, service apartments and a retail & food mall. Premium 2, 3, 3.5 & 4 BHK homes. Pre-launch enquiries now open.",
};

const Hennur = () => {
  return (
    <>
      <SobhaHennurHero />
      <AboutSobhaHennur />
      <HennurMasterPlan />
      <HennurAmenities />
      <HennurConfigs />
      <HennurLocation />
      <EnquirySection defaultProjectName="Sobha Hennur Township" />
    </>
  );
};

export default Hennur;
