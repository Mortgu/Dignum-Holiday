'use client';

import { useState } from "react";

export default function RoleSettingSection({roles, permissions}) {
    const [error, setError] = useState(null);
    const [newRoleName, setNewRoleName] = useState('');
    const [roleList, setRoleList] = useState(roles);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const newRolePermissions = [...event.target.permission]
            .filter(el => el.checked).map(el => parseInt(el.value));

        const response = await fetch('/api/roles', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({roleName: newRoleName, list: newRolePermissions})
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            return;
        }

        setRoleList(prev => [...prev, data]);
    }

    const handleEditRolePerms = async (role, permission, event) => {
        const checked = event.target.checked;

        const updated = roleList.map(r => {
            if (r.id === role.id) {
                let newPerms;

                if (checked) {
                    newPerms = [...r.RolePermission, {
                        permission: permission.id
                    }];
                } else {
                    newPerms = r.RolePermission.filter(p => p.permission !== permission.id);
                }
                return {...r, RolePermission: newPerms};
            }

            return r;
        });

        setRoleList(updated);

        const response = await fetch(`/api/roles/${role.id}/`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({permission, checked})
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            setRoleList(roleList);
            return;
        }


    }

    const handleRoleDeletion = async (role) => {
        const response = await fetch(`/api/roles/${role.id}`, {
            method: 'DELETE', credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            return;
        }

        setRoleList(roleList.filter(e => e.id !== role.id));
    }

    return (
        <></>
    )
}