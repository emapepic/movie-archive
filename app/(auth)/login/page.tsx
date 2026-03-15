'use client';

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const supabase = createClient();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const {error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert("Greška pri prijavi: " + error.message);
        } else {
            router.push("/home");
        }

        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <h1 className="self-start">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-2 w-3/4">
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-amber-50 p-1.5 rounded-sm"
                    required
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-amber-50 p-1.5 rounded-sm"
                    required
                />
                <button disabled={loading} className="w-fit px-4 mt-2 bg-[#29395c] rounded-sm shadow-lg">
                    Login
                </button>
            </form>
            <div className="flex flex-row gap-2">
                <p>Don&apos;t have an account?</p>
                <Link href="/register" className="text-blue-700">Register here</Link>
            </div>
        </div>
    );
}