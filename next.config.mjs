/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
      // {
      //   source: '/login/naver',
      //   destination: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=test&redirect_uri=http://localhost:3000/`,
      // },
    ];
  },
  trailingSlash: false /* 만약, 후행 슬래시가 필요하다면 true, default → false */,
};

export default nextConfig;
