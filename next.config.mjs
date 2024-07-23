/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
    assetPrefix: '/omedivad/public',
    basePath: '/portfolio',
};

export default nextConfig;
