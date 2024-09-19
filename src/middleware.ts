// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

    const token = req.cookies.get("jwt");

    const protectedRoutes = ["/my-account"];

    if (!token && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!auth|public|api).*)"],
};