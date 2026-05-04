import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <h2>Series not found</h2>
            <Link href='/series'>Back to series page</Link>
        </>
    )
}