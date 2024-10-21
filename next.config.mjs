/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Add this line to disable React Strict Mode
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
        domains: ['app.cvbuilder.co.za']
    }
};

export default nextConfig;
