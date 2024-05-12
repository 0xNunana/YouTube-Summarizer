import React from 'react'
import { StrapiImage } from './StrapiImage'
import Link from 'next/link'

const Calendar = ({data}) => {
   
 const {text,description,eventcard}=data
    return (
    <div className=''>
        <h1 className='py-10 bg-slate-100 text-center font-semibold text-4xl'>{text}</h1>
        <div className='mx-auto max-w-screen-2xl my-5'>
        <div className='grid grid-cols-4 gap-4'>
{eventcard.map((event,i)=>(
    <div key={i} className='border rounded-md'>
        <StrapiImage src={event.background.url} width={300} height={300} alt={event.info} className='w-full h-full object-cover rounded-t-md' />
        <p>{event.info}</p>
        <p>{event.eventdate}</p>
        <div className='flex justify-end'>
     <Link href='' className='bg-yellow-300 px-5 py-2'>
     Go
     </Link>
     </div>
    </div>
))}
        </div>
        </div>
      
    </div>
  )
}

export default Calendar