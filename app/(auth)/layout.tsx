import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className='min-h-screen flex items-center justify-center'>
            <div className='flex items-center justify-center w-sm p-8 bg-dark-blue rounded-lg shadow-xl'>
                {children}
            </div>
        </main>
    )
}