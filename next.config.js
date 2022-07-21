/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "cdn.icon-icons.com",
      "lh3.googleusercontent.com",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
