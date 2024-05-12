
'use client'

import {useFormState} from 'react-dom'
import { registerAction } from '@/lib/Actions/registerAction'
import React from 'react'
import Submit from './Submit'
import ZodErrors from './ZodErrors'
import { StrapiErrors } from './StrapiErrors'


const initial= { 
    data:null,
    errors:null,
    message:null
}

const SignupForm = () => {

    const [formState,formAction]=useFormState(registerAction,initial)

  return (
    <div className='bg-gray-300 p-5'>
        <h1><b>Sign Up</b></h1>
        <form className='space-y-4' action={formAction}>
            <div className=''>
            <label htmlFor='name'>
                Name
            </label>
            <input id='name'  type='text' className='block' name='name'/>
            <ZodErrors error={formState?.errors?.username}/>
            </div>
            
            <div className=''>
            <label htmlFor='em'>
                Email
            </label>
            <input id='em'  type='email' className='block' name='email'/>
            <ZodErrors error={formState?.errors?.email}/>
            </div>
        
        
            <div className=''>
            <label htmlFor='pass'>
                Password
            </label>
            <input id='pass'  type='password' className='block' name='password'/>
            <ZodErrors error={formState?.errors?.password}/>
            </div>
   <Submit/>
   <StrapiErrors error={formState?.strapiErrors}/>
           
        </form>
    </div>
  )
}

export default SignupForm