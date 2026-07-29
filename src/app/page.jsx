import AlternatingFeatures from "@/components/hero/features/AlternatingFeatures";
import GallerySection from "@/components/hero/galleryHero/GallerySection";
import HeroSlider from "@/components/hero/HeroSlider";
import LegacySection from "@/components/hero/hoemabout/LegacySection";
import SobhaParallax from "@/components/hero/paralex/SobhaParallax";
import ExploreProjects from "@/components/hero/projectsPart/ExploreProjects";
import PropertyListings from "@/components/hero/projectsPart/PropertyListings";
import SustainabilitySection from "@/components/hero/projectsPart/SustainabilitySection";
import VillaPlotsPromoSection from "@/components/landingpages/plotsComp/extraSec/VillaPlotsPromoSection";

import Head from "next/head";

export default function Home() {
  return (
    <>
      {/* 2. Google Tag Manager - Global site tag (gtag.js) */}
      <Head>
        {/* 1. Load the Google Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17493464492"
        ></script>

        {/* 2. Initialize it using dangerouslySetInnerHTML */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17493464492');
            `,
          }}
        />
      </Head>

      <HeroSlider />
      <LegacySection />
      <ExploreProjects />
      <PropertyListings />
      <VillaPlotsPromoSection />
      <SustainabilitySection />
      <SobhaParallax />
      <AlternatingFeatures />
      <GallerySection />
    </>
  );
}
