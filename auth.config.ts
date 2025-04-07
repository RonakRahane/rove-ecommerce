import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Notice: No PrismaClient import here! This file must be Edge compatible.

export default {
    providers: [
        Credentials({
            // The authorize function is empty purely for type satisfaction in the config.
            // The real implementation with Prisma logic will be merged in auth.ts
            async authorize(credentials) {
                return null;
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    callbacks: {
        // These callbacks must be edge-safe (no Prisma/DB calls)
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as "ADMIN" | "USER";
            }
            return session;
        },
        async jwt({ token, user }) {
            // On initial sign-in, `user` is the full user object from authorize()
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = nextUrl.pathname.startsWith('/admin');
            const isAuthRoute = nextUrl.pathname.startsWith('/auth');

            if (isAdminRoute) {
                if (isLoggedIn) {
                    // Check for admin role
                    const role = auth?.user?.role;
                    if (role === "ADMIN") return true;
                    // Logged in but not admin
                    return Response.redirect(new URL('/', nextUrl));
                }
                // Not logged in, redirect to login
                return Response.redirect(new URL('/auth/login', nextUrl));
            }

            // For auth routes, redirect to home if already logged in
            if (isAuthRoute && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }

            return true;
        }
    }
} satisfies NextAuthConfig
