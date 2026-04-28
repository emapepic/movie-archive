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

        if (data.user) {
            await supabase.from('users').insert([
                { 
                id: data.user.id,
                email: email
                }
            ]);
        }

        if (error) {
            toast.error('Error' + error.message);
        } else {
            toast.success('Registration successful!');
            router.push("/login");
        }
        
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <h1 className="self-start">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-2">
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
                <button type="submit" disabled={loading} className="w-fit px-4 mt-2 bg-[#29395c] rounded-sm shadow-lg">
                    Register
                </button>
            </form>
            {loading && <p>Registering...</p>}
            <div className="flex flex-row gap-2">
                <p>Already have an account?</p>
                <Link href="/login" className="text-blue-700">Login</Link>
            </div>
        </div>
    );
}