'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({className, ...props}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        if (response.ok) {
            router.push('/');
        } else {
            const data = await response.json();
            setError(data.error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={e => setEmail(e.target.value)} value={email} id="email" type="email"
                                       placeholder="m@example.com" required/>
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input onChange={e => setPassword(e.target.value)} value={password} id="password"
                                       type="password" required/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
