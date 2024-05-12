"use client";
import React from "react";
 import { useFormState } from "react-dom";


import { uploadProfileImageAction } from "@/lib/Actions/updateProfileImage";
import ZodErrors from "./ZodErrors";
import { StrapiErrors } from "./StrapiErrors";
import ImagePicker from "./ImagePicker";


const initialState = {
  message: null,
  data: null,
  StrapiErrors: null,
  ZodErrors: null,
};

export function ProfileImageForm({
  data,
  className,
}) {
  const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
    null,
    data?.id
  );

  const [formState, formAction] = useFormState(
    uploadProfileImageWithIdAction,
    initialState
  );

  return (
    <form className={`${className} space-y-4`} action={formAction}>
      <div className="">
        <ImagePicker
          id="image"
          name="image"
          label="Profile Image"
          defaultValue={data?.url || ""}
        />
        <ZodErrors error={formState.zodErrors?.image} />
        <StrapiErrors error={formState.strapiErrors} />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-black rounded-md text-white px-5 py-2">
            Upload Image
        </button>
      </div>
    </form>
  );
}