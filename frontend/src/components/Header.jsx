
import React from 'react'
import { StrapiImage } from './StrapiImage'
import Link from 'next/link'
import { getUserMeLoader } from '@/lib/services/getUser'
import Logoutbutton from './Logoutbutton'
import { SummaryForm } from './Video/SummaryForm'
const Header = async ({data}) => {
   const user = await getUserMeLoader()
   
  const {signinout,menu,logo}=data
  
    return (
    <div className='flex justify-between items-center px-5 py-1 sticky top-0 z-50 backdrop-blur-sm bg-blue-400/70'>
        <Link href='/'>
        <StrapiImage src={logo.url} className='' alt="logo" height={100} width={100} style={{width:'auto',height:'auto'}}/>
        </Link>
<ul className='flex gap-5'>
    {menu.map((item,i)=>(
        <Link href={item.url} key={i} className='bg-white/50 px-3 rounded-md'>
           <li>{item.text}</li>
        </Link>
     
    ))}

    {user.ok && (
      <Link href='/dashboard' className='bg-white/50 px-3 rounded-md'>Dashboard</Link>
    )}
</ul>
{user.ok && <SummaryForm/>}
{
user.ok ? (
<div className='underline capitalize flex gap-2 items-center' >
  <Link href='/dashboard/account' className='hover:text-gray-700'>
  <p>{user.data.username}</p>
  </Link>
 
       <Logoutbutton/>
        </div>
      
      
      ):(<Link href={signinout.url} className='bg-yellow-300 px-4 py-1.5 rounded-lg'>
<p>{signinout.text}</p>
</Link>
)
}

    </div>
  )
}

export default Header