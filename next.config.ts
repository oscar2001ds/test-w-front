import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  
  images: {
    domains: [],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/financial-simulator/home',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth',
        permanent: true,
      }
    ];
  },

  async rewrites() {
    return [
      // Ejemplo: proxy a tu backend si está en el mismo dominio
      // {
      //   source: '/api/:path*',
      //   destination: 'https://tu-backend.com/:path*',
      // },
    ];
  },
};

export default nextConfig;
