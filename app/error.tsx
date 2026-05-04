'use client'

export default function Error({error, reset}: {error: Error, reset: () => void}) {
    return (
        <>
            <h2>An error occured!</h2>
            <p>{error.message}</p>
            <button onClick={reset}>Try again</button>
        </>
    )
}