/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL,
    CRYPTR_SECRET_KEY: process.env.CRYPTR_SECRET_KEY
  }
}

module.exports = nextConfig
