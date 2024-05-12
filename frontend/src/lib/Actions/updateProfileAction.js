"use server";

import { mutateData } from "../services/mutateData";
import { flattenAttributes } from "../utils";

export async function updateProfileAction(
  userId, //receives the bind
  prevState,
  formData
) {
  const rawFormData = Object.fromEntries(formData);

 

  const payload = {
    firstName: rawFormData.firstName,
    lastName: rawFormData.lastName,
    bio: rawFormData.bio,
  };
const responseData = await mutateData('PUT',`/api/users/${userId}`,payload)

if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Register.",
    };
  }

  const flattenedData = flattenAttributes(responseData);



  return {
    ...prevState,
    message: "Profile Updated",
    data: flattenedData,
    strapiErrors: null,
  };
}