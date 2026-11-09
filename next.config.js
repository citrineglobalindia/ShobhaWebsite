/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "shoba.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/sobha-mullur",
        destination: "/sobha-aurelia",
        permanent: true,
      },
      {
        source: "/sobha-mullur/thank-you",
        destination: "/sobha-aurelia/thank-you",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
