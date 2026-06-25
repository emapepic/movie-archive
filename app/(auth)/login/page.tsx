'use client';

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from 'react-hot-toast';

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
            toast.error('Error' + error.message)
        } else {
            router.push("/");
        }

        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full p-4 bg-[#121212] border border-[#333] rounded-xl">
            <h1 className="self-start">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-2 w-3/4">
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-[#333] p-1.5 rounded-sm outline-none focus:ring-1 focus:ring-[#962c2c]"
                    required
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-[#333] p-1.5 rounded-sm outline-none focus:ring-1 focus:ring-[#962c2c]"
                    required
                />
                <button disabled={loading} className="w-fit mt-2 py-1 px-4 bg-[#962c2c] rounded-lg hover:bg-[#7a2424]">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="flex flex-row gap-2">
                <p>Don&apos;t have an account?</p>
                <Link href="/register" className="text-[#9b513b]">Register here</Link>
            </div>
        </div>
    );
}