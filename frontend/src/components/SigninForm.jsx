'use client'
import React from 'react'
import Link from 'next/link'
import { loginUserAction } from '@/lib/Actions/loginAction'
import {useFormState} from 'react-dom'
import ZodErrors from './ZodErrors'
import { StrapiErrors } from './StrapiErrors'

const initial= { 
    zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
}

const SigninForm = () => {
    const [current,action]=useFormState(loginUserAction,initial)
  return (
    <div className='bg-gray-300 p-5'>
        <h1 className='text-center text-3xl'><b>Sign In</b></h1>
        <form className='space-y-4' action={action}>
            <div className=''>
            <label htmlFor='name'>
                Email
            </label>
            <input id='name'  type='email' className='block' name='email'/>
            <ZodErrors error={current?.zodErrors?.identifier} />
            </div>
            <div className=''>
            <label htmlFor='pass'>
                Password
            </label>
            <input id='pass'  type='password' className='block' name='password'/>
            <ZodErrors error={current?.zodErrors?.password} />
            </div>
   
            <button type='submit' className='bg-yellow-300 px-4 py-2'>
                Submit
            </button>
            <StrapiErrors error={current?.strapiErrors}/>
        </form>
        <p>Dont have an account? <Link href='/signup' className='underline'> Sign Up</Link></p>
    </div>
  )
}

export default SigninForm