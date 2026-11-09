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
  alternates: {
    canonical: "https://www.sobha-specialoffers.com/sobha-mullur",
  },
  openGraph: {
    title: "Sobha Mullur | New Launch on Sarjapur Road, Bengaluru",
    description:
      "An upcoming premium residential community by Sobha Limited on Sarjapur Road, opposite Wipro Office, Kodathi. 24 acres, 11 wings and ~2,200 homes in 1, 2, 3 & 4 BHK. Indicative pricing ~₹17,000/sq.ft. Register your interest for EOI & pre-launch updates.",
    url: "https://www.sobha-specialoffers.com/sobha-mullur",
    siteName: "Sobha Special Offers",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg",
        width: 1200,
        height: 630,
        alt: "Sobha Mullur — Sarjapur Road, Opposite Wipro, Kodathi, Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobha Mullur | New Launch on Sarjapur Road, Bengaluru",
    description:
      "Upcoming 24-acre community by Sobha Limited on Sarjapur Road, opposite Wipro, Kodathi. 1, 2, 3 & 4 BHK homes, ~₹17,000/sq.ft indicative. EOI & pre-launch registrations open.",
    images: [
      "https://res.cloudinary.com/dkoljvhc9/image/upload/f_auto/v1769442581/alter_itsade.jpg",
    ],
  },
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
