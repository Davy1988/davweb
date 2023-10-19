/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_OPEN_AI: process.env.BASE_OPEN_AI,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  },
};

module.exports = nextConfig;
