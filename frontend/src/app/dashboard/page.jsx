import Logoutbutton from '@/components/Logoutbutton'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <p>Dashboard</p>
      <Logoutbutton/>
    </div>
  )
}

export default page