'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            router.push('/dashboard');
        } else {
            const data = await response.json();
            console.error(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}
                   required/>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}
                   required/>
            <button type='submit'>Login</button>
            #</form>
    )
}