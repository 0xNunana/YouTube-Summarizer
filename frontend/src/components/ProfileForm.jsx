'use client'
import { updateProfileAction } from "@/lib/Actions/updateProfileAction";
import React from "react";
import {useFormState} from 'react-dom'
import { StrapiErrors } from "./StrapiErrors";


const initial={
    data: null,
  strapiErrors: null,
  message: null,  
}

function CountBox({ text }) {
  return (
    <div className="flex items-center justify-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none">
      You have<span className={`${text > 0 ? 'text-red-700':'text-red-400'} font-bold text-md mx-1`}>{text}</span>credit(s)
    </div>
  );
}

export function ProfileForm({data}) {
const updatedProfileinfo = updateProfileAction.bind(null,data.id)
const [current,action]=useFormState(updatedProfileinfo,initial)
//adds extra field to submitted form
  return (
    <form action={action}
      className="space-y-4">
      <div className="space-y-4 grid ">
        <div className="grid md:grid-cols-3 gap-4 text-gray-500">
          <input
          className="border pl-2"
            id="username"
            name="username"
            placeholder="Username"
            defaultValue={data.username || ""}
            disabled
          />
          <input
            className="border pl-2"
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={data.email || ""}
            disabled
          />
          <CountBox text={data.credits} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border pl-2"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            defaultValue={data.firstName || ""}
          />
          <input
            className="border pl-2 py-2"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            defaultValue={data.lastName || ""}
          />
        </div>
        <textarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[250px] p-2"
          
          defaultValue={data.bio || ""}
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-black px-4 rounded-md text-white py-1" >
        Update Profile
        </button>
      </div>
      <StrapiErrors error={current?.strapiErrors} />
    </form>
  );
}