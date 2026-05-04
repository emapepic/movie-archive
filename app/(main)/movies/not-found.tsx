import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <h2>Movie not found</h2>
            <Link href='/movies'>Back to movies page</Link>
        </>
    )
}