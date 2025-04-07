import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// This is a simplified middleware that just uses authConfig
// The actual auth check logic is in authConfig's authorized callback
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)'],
}
