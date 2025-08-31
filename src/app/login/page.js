'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { config } from '@/config';
import prisma from "@/app/lib/prisma.js";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${config.apiUrl}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            router.push('/dashboard');
        } else {
            const data = await response.json();
            setError(data.error);
        }
    };

    return (
        <div className='login-page'>
            <div className='login-message-display'>
                <p>{error}</p>
            </div>
            <form className='login-form' onSubmit={handleSubmit}>
                <input type='email' placeholder='E-Mail' value={email} onChange={(e) => setEmail(e.target.value)}
                       required/>
                <input type='password' placeholder='Password' value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                <button type='submit'>Login</button>
            </form>

        </div>
    )
}