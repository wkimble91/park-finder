/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const path = require('path');
module.exports = {
  nextConfig,
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "@styles/variable.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nps.gov',
        port: '',
        pathname: '/common/uploads/**',
      },
    ],
  },
};
