import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.jfa.jp',
        pathname: '/national_team/img/member/**',
      },
    ],
  },
}

export default nextConfig
