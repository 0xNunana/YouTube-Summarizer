import { StrapiImage } from './StrapiImage'
import React from 'react'
import Link from 'next/link'


const Hero = ({data}) => {
   
 const {heading,subheading,image,id,Link:link}=data

    return (
    <div className='relative h-[600px] overflow-hidden '>
        
        <StrapiImage src={image.url} width={1920} height={1080} alt='bg' className=' absolute inset-0 object-cover w-full h-full'
      
        />
        <div className='bg-black/40 absolute inset-0'/>
        <div className='relative z-10 flex flex-col items-center justify-center h-full text-center text-white'>
            <h1 className='text-[250px] font-bold '>
                {heading}
            </h1>
            <p className='text-3xl font-semibold'>
                {subheading}
            </p>

            {/* <Link href={link.url} className='bg-yellow-300 z-10 relative px-7 my-2 py-3 rounded-md text-black'>
        {link.text}
        </Link> */}
        </div>
      
    </div>
  )
}

export default Hero