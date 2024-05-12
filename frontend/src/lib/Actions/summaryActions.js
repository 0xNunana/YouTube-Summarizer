"use server";

import { revalidatePath } from "next/cache";
import { getAuthToken } from "../services/getToken";
import { mutateData } from "../services/mutateData";
import { flattenAttributes } from "../utils";
import { redirect } from "next/navigation";

// interface Payload {
//   data: {
//     title?: string;
//     videoId: string;
//     summary: string;
//   };
// }

export async function createSummaryAction(payload) {
 
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("POST", "/api/summaries",payload );
  const flattenedData = flattenAttributes(data);
  
  redirect("/dashboard/summaries/" + flattenedData.id);
}


export async function updateSummaryAction( formData) {
  const summaryUpdate = formData.get('updatedsummary')
  const id = formData.get('id')

  const payload = {
    data: {
      
      summary: summaryUpdate,
    },
  };

  const responseData = await mutateData("PUT", `/api/summaries/${id}`, payload);

  if (!responseData) {
    return {
      // ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      // ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to update summary.",
    };
  }

  const flattenedData = flattenAttributes(responseData);
  revalidatePath("/dashboard/summaries");

  return {
    // ...prevState,
    message: "Summary updated successfully",
    data: flattenedData,
    strapiErrors: null,
  };
}

export async function deleteSummaryAction(id) {

  const responseData = await mutateData("DELETE", `/api/summaries/${id}`);

  if (!responseData) {
    return {
      // ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      // ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to delete summary.",
    };
  }

  redirect("/dashboard/summaries");
}