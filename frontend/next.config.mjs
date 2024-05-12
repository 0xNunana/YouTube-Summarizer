/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'http',
                hostname:'127.0.0.1',
                port:'1337'
              }
            ,         {
                protocol:'http',
                hostname:'localhost',
                port:'1337',
                pathname:'/uploads/**/*'
              },
              {
                protocol:'https',
                hostname:'placehold.co',
            
              },
              {
                protocol:'https',
                hostname:'ethical-leader-0d5e534981.media.strapiapp.com'
              }

            ],
    }
};

export default nextConfig;
