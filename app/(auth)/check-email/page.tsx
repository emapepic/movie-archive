import Link from "next/link";

export default function CheckEmailPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full p-4 bg-[#121212] border border-[#333] rounded-xl">
            <h1>Check your email</h1>
            <p className="text-center text-gray-400">
                Email for verification has been sent.
                Click on link in email to activate your account.
            </p>
            <Link href="/login" className="w-fit mt-2 py-1 px-4 bg-[#962c2c] rounded-lg hover:bg-[#7a2424]">
                Back to login
            </Link>
        </div>
    );
}