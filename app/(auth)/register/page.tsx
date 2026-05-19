'use client';

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const supabase = createClient();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            toast.error('Error: ' + error.message);
        } else if (data.user && data.user.identities?.length === 0) {
            toast.error('Account already exists. Check your email.');
        } else {
            toast.success('Check your email to confirm your account!');
            router.push("/check-email");
        }
        
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full p-4 bg-[#121212] border border-[#333] rounded-xl">
            <h1 className="self-start">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-2">
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
                <button type="submit" disabled={loading} className="w-fit mt-2 py-1 px-4 bg-[#962c2c] rounded-lg hover:bg-[#7a2424]">
                    Register
                </button>
            </form>
            {loading && <p>Registering...</p>}
            <div className="flex flex-row gap-2">
                <p>Already have an account?</p>
                <Link href="/login" className="text-[#9b513b]">Login</Link>
            </div>
        </div>
    );
}