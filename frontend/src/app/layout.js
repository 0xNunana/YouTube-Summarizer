import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {getStrapiData } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "0xNunana | Strapi Project",
  description: "Nextjs Frontend with Strapi Backend",
};




export default async function RootLayout({ children }) {
const globalData = await getStrapiData('/api/global?populate[0]=header.logo&populate[1]=header.menu&populate[2]=header.signinout&populate[3]=footer.copy&populate[4]=footer.contact')

  return (
    <html lang="en">
      <body className={inter.className}>
       <Header data={globalData.header}/>
        <div>{children}</div>
        <Footer data={globalData.footer}/>
        
        </body>
    </html>
  );
}
