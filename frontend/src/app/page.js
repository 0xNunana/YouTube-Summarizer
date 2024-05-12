import Calendar from "@/components/Calendar";
import Hero from "@/components/Hero";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";



const getStrapiData =async(path)=>{
  const baseUrl = getStrapiURL()
  try {
    const response = await fetch(baseUrl + path)
    const data = await response.json()
    const flattenedData = flattenAttributes(data)
    return flattenedData;
  } catch (error) {
    console.error(error)
  }
}

export default async function Home  () {
const HomeData = await getStrapiData('/api/homepage?populate[blocks][populate][image][fields][0]=url&populate[blocks][populate][Link][populate]=true&populate[blocks][populate][eventcard][populate][background][fields][0]=url')


//to get everything in HomeData
//console.dir(HomeData,{depth:null})
const {blocks} = HomeData

  return (
    <main className="min-h-screen">
     <Hero data={blocks[0]}/>
     <Calendar data={blocks[1]}/>
    </main>
  );
}
