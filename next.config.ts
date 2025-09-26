import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config) => {
    config.resolve.symlinks = false; // evita problemas con symlinks en Windows
    return config;
  }
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);