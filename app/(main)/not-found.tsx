import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <h2>Media not found</h2>
            <Link href='/'>Back to homepage</Link>
        </>
    )
}