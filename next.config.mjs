import dotenv from "dotenv"

if (!process.env["VERCEL_ENV"] != "production") {
  dotenv.config({ path: "./.env.local" })
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
/**
 * Returns an array of objects defining headers for the '/api/cdnImg' endpoint.
 *
 * The headers include:
 * - Access-Control-Allow-Origin: '*' to allow all origins.
 * - Access-Control-Allow-Methods: 'GET' to allow only GET requests.
 * - Access-Control-Allow-Headers: 'Content-Type' to specify allowed headers.
 * - Access-Control-Allow-Credentials: 'true' to allow credentials.
 * - Content-Type: 'image/webp' to specify the media type of the resource.
 *
 * @returns {Array<Object>} An array containing header configuration objects.
 */
  async headers() {
    return [
      {
        source: '/api/cdnImg',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Content-Type',
            value: 'image/webp',
          }
        ],
      },
    ]
  },
};

export default nextConfig
