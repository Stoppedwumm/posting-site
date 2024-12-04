import dotenv from "dotenv"

if (!process.env["VERCEL_ENV"] != "production") {
  dotenv.config({path: "./.env.local"})
}
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: process.env.DATABASE_URL
    },
    experimental: {
        serverActions: {
          bodySizeLimit: '5mb',
        },
      },
};

export default nextConfig
