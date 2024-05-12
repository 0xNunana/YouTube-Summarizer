import { fetchTranscript } from "@/lib/youtubetranscript";
import { getAuthToken } from "@/lib/services/getToken";
import { getUserMeLoader } from "@/lib/services/getUser";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

function transformData(data) {
    let text = "";
  
    data.forEach((item) => {
      text += item.text + " ";
    });
  
    return {
      data: data,
      text: text.trim(),
    };
  }

//template 
// const TEMPLATE = `
// INSTRUCTIONS: 
//   For the this {text} complete the following steps.
//   Generate the title based on the content provided
//   Summarize the following content and include 5 key topics, writing in first person using normal tone of voice.
  
//   Write a youtube video description
//     - Include heading and sections.  
//     - Incorporate keywords and key takeaways

//   Generate bulleted list of key points and benefits

//   Return possible and best recommended key words
// `;



  // //function to generate text based on a template of prompts and the content to be used
  // async function generateSummary(content, template) {
  //   const prompt = PromptTemplate.fromTemplate(template);
  
  //   const model = new ChatOpenAI({
  //     openAIApiKey:'sk-proj-YmmMPtsu3aGsyntmhU6PT3BlbkFJBg3MgxIjoxrMipXq1vey',
  //     modelName: process.env.OPENAI_MODEL ?? "gpt-3.5-turbo",
  //     temperature: process.env.OPENAI_TEMPERATURE
  //       ? parseFloat(process.env.OPENAI_TEMPERATURE)
  //       : 0.7,
  //     maxTokens: process.env.OPENAI_MAX_TOKENS
  //       ? parseInt(process.env.OPENAI_MAX_TOKENS)
  //       : 4000,
  //   });
  
  //   const outputParser = new StringOutputParser();
  //   const chain = prompt.pipe(model).pipe(outputParser);
  
  //   try {
  //     const summary = await chain.invoke({ text: content });
  //     return summary;
  //   } catch (error) {
  //     if (error instanceof Error)
  //       return new Response(JSON.stringify({ error: error.message }));
  //     return new Response(
  //       JSON.stringify({ error: "Failed to generate summary." })
  //     );
  //   }
  // }



export async function POST(req) {
const user = await getUserMeLoader()
const token = await getAuthToken()

  if (!user.ok || !token)
  return new Response(
    JSON.stringify({ data: null, error: "Not authenticated" }),
    { status: 401 }
  );

if (user.data.credits < 1)
  return new Response(
    JSON.stringify({
      data: null,
      error: "Insufficient credits",
    }),
    { status: 402 }
  );


  
  const body = await req.json()
  const {videoId}= body;
  try {
    let transcript = await fetchTranscript(videoId)
    const transformed =transformData(transcript)

  
    // const summary = await generateSummary(transformData.text,TEMPLATE);

    return new Response(JSON.stringify({data:{
      summary:transformed.text,
      id:videoId
    },error:null}))
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error }));
    return new Response(JSON.stringify({ error: "Unknown error" }));
  }
}