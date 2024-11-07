/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cvbuilder.co.za',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
