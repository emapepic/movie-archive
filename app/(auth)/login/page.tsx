import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <h1 className="self-start">Login</h1>
            <form className="flex flex-col items-center justify-center gap-2 w-3/4">
                <input 
                    type="email"
                    placeholder="Email"
                    className="border border-amber-50 p-1.5 rounded-sm"
                    required
                />
                <input 
                    type="password"
                    placeholder="Password"
                    className="border border-amber-50 p-1.5 rounded-sm"
                    required
                />
                <button className="w-fit px-4 mt-2 bg-[#29395c] rounded-sm shadow-lg">
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