import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <h1 className="self-start">Register</h1>
            <form className="flex flex-col items-center justify-center gap-2">
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
                    Register
                </button>
            </form>
            <div className="flex flex-row gap-2">
                <p>Already have an account?</p>
                <Link href="/login" className="text-blue-700">Login</Link>
            </div>
        </div>
    );
}