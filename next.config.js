/** @type {import('next').NextConfig} */
const nextConfig = {
  // change to true in prod
  reactStrictMode: false,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
}

module.exports = nextConfig