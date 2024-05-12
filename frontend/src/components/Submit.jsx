'use client'

import React from 'react'
import {useFormStatus} from 'react-dom'

const Submit = () => {
  const {pending}=useFormStatus()
  return (
    <button type='submit' className={`${!pending} && bg-yellow-300 px-4 py-2'`} disabled={pending}>
                Signup
            </button>
  )
}

export default Submit