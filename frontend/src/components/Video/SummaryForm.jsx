"use client";

import { useState } from "react";
//import { toast } from "sonner"; if used, import toaster in layout to work

import { generateSummaryService } from "./SummaryService";
import { extractYouTubeID } from "@/lib/utils";
import { createSummaryAction } from "@/lib/Actions/summaryActions";


const INITIAL_STATE = {
  message: null,
  name: "",
};

export function SummaryForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(INITIAL_STATE);
  const [value, setValue] = useState("");

  async function handleFormSubmit(event) {
    event.preventDefault();
    setLoading(true);
    //toast.success("Submitting Form");

    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") ;
  
    const processedVideoId = extractYouTubeID(videoId);
  
    if (!processedVideoId) {
      console.log("Invalid Youtube Video ID");
      setLoading(false);
      setValue("");
      setError({
        ...INITIAL_STATE,
        message: "Invalid Youtube Video ID",
        name: "Invalid Id",
      });
      return;
    }
  
    // toast.success("Generating Summary");
  
    const summaryResponseData = await generateSummaryService(videoId);
   
  try {
    await createSummaryAction(summaryResponseData)
  } catch (error) {
    setError({
      ...INITIAL_STATE,
      message: "Failed to create Summary",
      name: "Summary error",
    });
  }
      
  if (summaryResponseData.error) {
    setValue("");
    toast.error(summaryResponseData.error);
    setError({
      ...INITIAL_STATE,
      message: summaryResponseData.error,
      name: "Summary Error",
    });
    setLoading(false);
    return;
  }


    // toast.success("Summary Created");
    setLoading(false);
  }

  function clearError() {
    setError(INITIAL_STATE);
    if (error.message) setValue("");
  }

  const errorStyles = error.message
    ? "outline-1 outline outline-red-500 placeholder:text-red-700"
    : "";

  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center"
      >
        <input
          name="videoId"
          placeholder={
            error.message ? error.message : "Youtube Video ID or URL"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={clearError}
          className={`
            "w-full focus:text-black focus-visible:ring-pink-500",
            ${errorStyles}
          `}
          required
        />

        <button
       className="bg-green-400 px-5 py-2 rounded-md"

        >Create Summary </button>
      </form>
    </div>
  );
}