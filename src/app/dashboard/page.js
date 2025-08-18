"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
    const [message, setMessage] = useState("Lade...");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        fetch("/api/protected", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setMessage(data.message || "Fehler"))
            .catch(() => setMessage("Fehler beim Laden"));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p>{message}</p>
        </div>
    );
}
