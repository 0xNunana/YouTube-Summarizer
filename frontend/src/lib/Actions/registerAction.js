'use server'
import {z} from 'zod'
import { registerUserService } from '../services/auth-services'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';


const config = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };



const schema = z.object({
    username: z.string({ invalid_type_error: 'Invalid username',}).min(3).max(25,{message:"username must be 3 and 25 characters"}),
    password: z.string({ invalid_type_error: 'Invalid password',}).min(6).max(100,{message:"Password must be 6 to 100 characters"}),
      email: z.string({
        invalid_type_error: 'Invalid Email',
      }).email({message:"please enter a valid email address"}),
  })
   


export const registerAction=async (prevState,formData)=>{
   
    // const fields={
    //     username:formData.get('name'),
    //     password:formData.get('password'),
    //     email:formData.get('email')
    // }

    const validatedFields = schema.safeParse({
        username:formData.get('name'),
        password:formData.get('password'),
        email:formData.get('email')
    })

   // Return early if the form data is invalid
   if (!validatedFields.success) {
    return {
        ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message:"Missing Fields. Failed to Register"
    }
  }
  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }
  
  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  cookies().set("jwt", responseData.jwt, config);
  redirect('/dashboard')



}