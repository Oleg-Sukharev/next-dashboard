/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         { key: 'referrer-policy', value: 'no-referrer' }
  //       ]
  //     }
  //   ]
  // }
};

module.exports = nextConfig;
