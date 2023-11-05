/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    exportTailingSplash: true,
    assetPrefix: process.env.NODE_ENV === "production" ? "https://text-indent9999px.github.io/project_shopping" : ""
}

module.exports = nextConfig