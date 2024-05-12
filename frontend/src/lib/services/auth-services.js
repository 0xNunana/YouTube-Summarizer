import { getStrapiURL } from "../utils";

// interface RegisterUserProps{
//     username:string;
//     password:String;
//     email:string
// }

const baseUrl = getStrapiURL()

export const registerUserService =async (userData)=>{
try {
    const response = await fetch(baseUrl + '/api/auth/local/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({...userData}),
        cache:'no-cache'
    })

    return response.json()
} catch (error) {
    console.error(error)
}
}


export async function loginUserService(userData) {
    const url = new URL("/api/auth/local", baseUrl);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
        cache: "no-cache",
      });
  
      return response.json();
    } catch (error) {
      console.error("Login Service Error:", error);
      throw error;
    }
  }