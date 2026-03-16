"use client"; 

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Homepage() {
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            alert("Greška: " + error.message);
        } else {
            router.refresh(); 
            router.push("/login");
        }
    };

    return (
        <div>
            <h1>LOGGED IN</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}