import { getAuthToken } from "./getToken";
import { flattenAttributes } from "../utils";
import { getStrapiURL } from "../utils";
import qs from 'qs'


const baseUrl= getStrapiURL()
async function fetchData(url) {
    const authToken = await getAuthToken();
  
    const headers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
  
    try {
      const response = await fetch(url, authToken ? headers : {});
      const data = await response.json();
      return flattenAttributes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  export async function getSummaries(queryString,currentPage) {

    const PAGE_SIZE=4 //number of summaries per page

    const query = qs.stringify({
      sort: ["createdAt:desc"],
      filters: {
        $or: [
        
          { summary: { $containsi: queryString } },
        ],
      },
      pagination:{
        pageSize:PAGE_SIZE,
        page:currentPage
      }
    });
    const url = new URL("/api/summaries", baseUrl);
    url.search = query;
    return fetchData(url.href);
  }


  export async function getSummariesById(summaryId){
    return fetchData(`${baseUrl}/api/summaries/${summaryId}`)
  }