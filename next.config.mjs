/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure the private PDF is bundled with the /api/download serverless
  // function on Vercel (it's read at runtime, outside /public).
  outputFileTracingIncludes: {
    "/api/download": ["./private/**"],
  },
};

export default nextConfig;
