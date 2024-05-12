import { logoutAction } from '@/lib/Actions/logoutAction'
import React from 'react'

const Logoutbutton = () => {
  return (
   <form action={logoutAction}>
    <button type='submit' className='bg-red-300 px-5 py-2 rounded-md'>
        <p>Logout</p>
    </button>
   </form>
  )
}

export default Logoutbutton