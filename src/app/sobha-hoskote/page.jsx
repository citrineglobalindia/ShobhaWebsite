import EnquirySection from "@/components/landingpages/altairPage/EnquirySection";
import SobhaHoskoteAmenities from "@/components/landingpages/hoskotePage/amanities/SobhaHoskoteAmenities";
import AboutSobhaHoskote from "@/components/landingpages/hoskotePage/hoskoteAbout/AboutSobhaHoskote";
import SobhaHoskoteOverview from "@/components/landingpages/hoskotePage/hoskoteAbout/SobhaHoskoteOverview";
import SobhaHoskoteHero from "@/components/landingpages/hoskotePage/hoskoteHero/SobhaHoskoteHero";
import MasterPlan from "@/components/landingpages/hoskotePage/map/MasterPlan";
import React from "react";

import Head from "next/head";

const Hoskote = () => {
  return (
    <>
      <SobhaHoskoteHero />
      <AboutSobhaHoskote />
      <SobhaHoskoteOverview />
      <SobhaHoskoteAmenities />
      <MasterPlan />
      <EnquirySection />
    </>
  );
};

export default Hoskote;
