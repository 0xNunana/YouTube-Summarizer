import React from 'react'

const Footer = ({data}) => {
    const {copy,contact}=data
  
  return (
    <div className='flex justify-evenly bg-black/30 py-10'>
        <p>{copy}</p>
        <p>{contact}</p>
    </div>
  )
}

export default Footer