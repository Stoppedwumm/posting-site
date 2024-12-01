/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: process.env.DATABASE_URL || "postgresql://neondb_owner:HYgcRzWp67dI@ep-flat-cloud-a2ppy3b5.eu-central-1.aws.neon.tech/neondb?sslmode=require"
    },
    experimental: {
        serverActions: {
          bodySizeLimit: '10mb',
        },
      },
};

export default nextConfig;
