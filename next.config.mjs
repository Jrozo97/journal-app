/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1mnsg3hwym3se.cloudfront.net",
      },
    ]
  }
  
};



export default nextConfig;
