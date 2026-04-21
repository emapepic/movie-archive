'use client'

import { useState, useEffect } from "react";
import { getCurrentUser, updateUserCredentials } from "@/lib/actions";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadUserData() {
            try {
                const user = await getCurrentUser();
                if (user) {
                    setEmail(user.email ?? "");
                }
            } catch (error) {
                console.error("Greška pri učitavanju korisnika: ", error)
            } finally {
                setLoading(false);
            }
        }
        loadUserData();
    }, [])

    const handleEdit = () => {
        setIsEditing(prev => !prev)
        setIsDisabled(prev => !prev);
        setMessage("");
    };

    const handleSave = async () => {
        setMessage("");

        try {
            await updateUserCredentials(password);

            setMessage("Updates saved!");
            setIsEditing(false);
            setIsDisabled(true);
            setPassword("");
        } catch (error) {
            console.error("Error", error)
            setMessage('Error, data has not been changed');
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex items-center justify-center w-full h-[80vh]">
            <div className="flex flex-col items-center justify-center gap-5 w-1/2 p-5 bg-amber-900 rounded-xl border border-white">
                <h1>Edit Profile</h1>
                <div className="flex flex-col justify-start gap-2">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={email}
                        disabled
                        className="border border-white rounded-sm" />
                </div>
                <div className="flex flex-col justify-start gap-2">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        disabled={isDisabled} 
                        className="border border-white rounded-sm" />
                </div>
                {message && <p className="text-sm">{message}</p>}
                <div className="flex flex-row gap-5">
                    <button onClick={handleEdit} className="p-2 border border-white rounded-lg">
                        {isEditing ? 'Cancel' : 'Edit profile'}
                    </button>
                    {isEditing && <button onClick={handleSave} className="p-2 border border-white rounded-lg">Save</button>}
                </div>
            </div>
        </div>
    );
}