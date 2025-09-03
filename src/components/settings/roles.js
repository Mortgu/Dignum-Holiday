'use client';

import { useEffect, useState } from "react";
import PermissionCheckbox from "@/components/settings/PermissionCheckbox.js";

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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roleName: newRoleName, list: newRolePermissions })
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
                return { ...r, RolePermission: newPerms };
            }

            return r;
        });

        setRoleList(updated);

        const response = await fetch(`/api/roles/${role.id}/`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ permission, checked })
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
        <div className='setting-section role-setting-section'>
            {/* Role creation form */}
            <fieldset className='role-setting-form-section'>
                <legend>Create</legend>
                {error && (<p>{error}</p>)}
                <form className='role-setting-form' method='POST' onSubmit={handleFormSubmit}>
                    <input type='text' name='name' value={newRoleName} onChange={e => setNewRoleName(e.target.value)}
                           placeholder='Role name'/>

                    <button type='submit'>Create</button>

                    <fieldset className='role-setting-permission-section'>

                        {permissions.map((permission, index) => (
                            <label key={index}>
                                <input type='checkbox'
                                       name='permission'
                                       value={permission.id}
                                />

                                {permission.name}
                            </label>
                        ))}

                    </fieldset>
                </form>

            </fieldset>

            {/* Roles display */}
            <fieldset className='role-setting-display-section'>
                <legend>Roles</legend>
                <div className='role-display-flex' style={{display: 'flex', flexWrap: 'wrap'}}>
                    {roleList.map((role, index) => (
                        <fieldset key={role.id} style={{flex: '1'}}>
                            <legend>{role.name}</legend>
                            {permissions.map(permission => {
                                const hasPermission = !!role.RolePermission.find(p => p.permission === permission.id);
                                return (
                                    <PermissionCheckbox
                                        key={permission.id}
                                        checked={hasPermission}
                                        onChange={(event) => handleEditRolePerms(role, permission, event)}
                                        id={permission.id}
                                        displayName={permission.name}
                                        disabled={role.system}
                                    />
                                )
                            })}

                            {!role.system && (
                                <button onClick={() => handleRoleDeletion(role)}>Delete Role</button>
                            )}
                        </fieldset>
                    ))}
                </div>
            </fieldset>


        </div>
    )
}