"use client";

import { useState } from "react";

export default function RoleCreationForm({ permissions }) {
    const [roleName, setRoleName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const list = [...event.target.permission]
            .filter(el => el.checked).map(el => el.value);

        const response = await fetch('/api/roles', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({roleName, list})
        });
    }

    return (
        <form method='POST' onSubmit={handleSubmit}>
            <input type='text' name='name' value={roleName} onChange={(e) => setRoleName(e.target.value)} placeholder='Name' />
            <button type='submit'>Create</button>
            <fieldset>
                <legend>Permissions</legend>
                {permissions.map((permission, index) => (
                    <label key={index}>
                        <input type='checkbox' checked={permission.base} name='permission' value={permission.id} /> {permission.name}
                    </label>
                ))}
            </fieldset>
        </form>
    )
}