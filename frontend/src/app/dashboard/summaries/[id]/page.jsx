import React from 'react'
import { getSummariesById } from '@/lib/services/summariesloader'
import { notFound } from 'next/navigation'
import { deleteSummaryAction, updateSummaryAction } from '@/lib/Actions/summaryActions'

const page = async ({params}) => {
const data = await getSummariesById(params.id)
if(data?.error?.status===404) return notFound()

  return (
    <div className='max-w-screen-2xl mx-auto my-10 grid grid-cols-2 gap-5' >
      <div className='border-4 p-2 overflow-y-scroll'> 
      <div className='flex  justify-between'>
      <p><span className='font-bold text-2xl'>Summary Number:</span> {data.id}</p>
      <div>
        <form action={deleteSummaryAction.bind(null,data.id)}>
          <button className='bg-red-600 px-4 py-1 rounded-md text-white'>
            Delete
          </button>
        </form>
      </div>
      </div>

        <p className='py-5 px-2'>{data.summary}</p>
      </div>

   
        <div className='p-5'>
<form  action={updateSummaryAction}>
  <textarea name='updatedsummary' className='w-full min-h-[500px] border rounded-md mb-2' defaultValue={data.summary}/>
  <input type="hidden" name="id" value={data.id} />
  <div className='flex justify-end'>
  <button className='bg-black px-5 py-2 rounded-md text-white'>
            Update
          </button>
  </div>
 
</form>
         
        </div>
    </div>
  )
}

export default page