import React from 'react'

const ZodErrors = ({error}) => {
    if(!error) return null
  return error.map((err,i)=>(
    <div key={i} className='text-red-500 italic '>
        {err}
    </div>
  ))
}

export default ZodErrors