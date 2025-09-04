'use client';

import { useSearchParams } from "next/navigation.js";
import { ProfileForm } from "@/app/(authenticated)/settings/@modal/(.)admin/users/edit/edit-form.js";
import { useEffect, useState } from "react";

export default function Page({children}) {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const searchParams = useSearchParams()
    const id = searchParams.get('id');

    useEffect(() => {

        const fetchUser = async () => {
            const response = await fetch(`/api/users/${id}`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data);
            } else {
                setError(data.error);
            }
        }

        fetchUser();

    }, []);

    if (error) {
        return (
            <p>{error}</p>
        )
    }

    if (user) {
        return (
            <div className="grid items-center px-4 lg:px-6">
                <div className="overflow-hidden rounded-md">
                    <ProfileForm user={user}/>
                </div>
            </div>
        )
    }
}