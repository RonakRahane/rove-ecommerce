"use client";

import { useTransition, useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/login";
import { ShieldCheck, Loader2 } from "lucide-react";

// Manual validation or use standard form
export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit = (formData: FormData) => {
        setError("");
        setSuccess("");

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        startTransition(() => {
            login({ email, password })
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                });
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-black rounded-full text-white">
                        <ShieldCheck size={24} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
                    <p className="text-sm text-gray-500">Enter your credentials to access the dashboard</p>
                </div>

                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="admin@rove.com"
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            disabled={isPending}
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 border border-red-200 text-red-600 text-sm rounded-md">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full bg-black hover:bg-zinc-800 text-white" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>
                </form>

                <div className="text-center text-xs text-gray-400">
                    Protected by reCAPTCHA and Subject to the Privacy Policy.
                </div>
            </div>
        </div>
    );
}
