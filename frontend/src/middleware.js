import { NextResponse } from "next/server";

import { getUserMeLoader } from "./lib/services/getUser";

export async function middleware(request) {
   const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

 

  return NextResponse.next();
}