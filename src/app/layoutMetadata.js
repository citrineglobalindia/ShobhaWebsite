export const metadata = {
  title: {
    default: "Sobha Projects Bengaluru | Altair, Hoskote, Townpark & Ayana",
    template: "%s | Sobha Luxury Apartments Bengaluru",
  },
  description:
    "Explore Sobha's premium residential launches in Bengaluru: Sobha Altair (Hennur), Sobha Hoskote (East Bangalore), Sobha Townpark (Hosur Road), and Sobha Ayana. Discover 2, 3 & 4 BHK luxury apartments featuring world-class amenities, prime locations, and superior craftsmanship.",
  keywords: [
    // Brand & General
    "Sobha Limited",
    "Sobha Realty Bangalore",
    "Luxury Apartments Bengaluru",
    "New Launch Projects Bangalore",
    "Premium Flats for sale in Bangalore",

    // Sobha Altair
    "Sobha Altair",
    "Sobha Altair Hennur Road",
    "Sobha Altair 3 BHK Price",
    "Sobha Altair Reviews",

    // Sobha Hoskote
    "Sobha Hoskote",
    "Sobha Projects Hoskote",
    "sobha one world",
    "Sobha East Bangalore",
    "Sobha Hoskote Pre-launch",
    "Apartments near STRR Bangalore",

    // Sobha Townpark
    "Sobha Townpark",
    "Sobha Townpark Electronic City",
    "Sobha Townpark Hosur Road",
    "Sobha Townpark Manhattan Towers",
    "Sobha Townpark Queens Towers",

    // Sobha Ayana
    "Sobha Ayana",
    "Sobha Ayana New Launch",
    "Sobha Ayana Bangalore",
    "Sobha Ayana Floor Plans",

    // Location Specific
    "Flats in Hennur Road",
    "Apartments in Hoskote",
    "Real Estate Electronic City",
    "Gated Community Apartments Bangalore",
  ],
  alternates: {
    canonical: "https://www.your-real-estate-domain.com", // Replace with actual domain
  },
  metadataBase: new URL("https://www.your-real-estate-domain.com"), // Replace with actual domain
  category: "Real Estate | Residential | Luxury Apartments | New Launch",

  // Icon configuration
  icons: {
    icon: ["/shobalogo.png"],
    apple: ["/shobalogo.png"],
    shortcut: ["/shobalogo.png"],
  },

  // Author & Creator Information
  authors: [
    {
      name: "CDevXGen Technologies",
      url: "https://www.cdevxgen.com",
    },
  ],
  creator: "CDevXGen Technologies",
  publisher: "Sobha Authorized Marketing Partner", // or appropriate entity

  // Open Graph for Social Media (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title:
      "Sobha Luxury Projects | Altair, Hoskote, Townpark & Ayana | Bengaluru",
    description:
      "Your gateway to Sobha's finest homes. Featuring Sobha Altair, Sobha Hoskote, Sobha Townpark & Sobha Ayana. 2, 3 & 4 BHK Luxury Apartments available now.",
    url: "https://www.your-real-estate-domain.com",
    siteName: "Sobha Premium Homes Bengaluru",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/shobalogo.png", // Ensure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "Sobha Projects Bengaluru - Altair, Hoskote, Townpark, Ayana",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "New Launch Alert: Sobha Altair, Hoskote, Townpark & Ayana",
    description:
      "Discover the finest luxury apartments in Bengaluru by Sobha. Prime locations, premium amenities, and limited-time launch offers.",
    images: ["/shobalogo.png"], // Ensure this image exists
  },

  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Optional: Geo-tagging for Local SEO
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
    "geo.position": "12.9716;77.5946", // Approx Bangalore coordinates
    ICBM: "12.9716, 77.5946",
  },

  language: "en",
  rating: "General",
};
