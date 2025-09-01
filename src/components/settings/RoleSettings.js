'use client'

import PermissionCheckbox from "@/components/settings/PermissionCheckbox.js";

export default function RoleSettings({roles, permissions}) {
    const handleChangePerm = async (role, permission, event) => {
        console.log(role, permission);

        const response = await fetch(`/api/roles/${role.id}/`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ permission, checked: event.target.checked })
        });

        if (response.ok) {
            event.target.checked = !event.target.checked;
        }
    }

    return (
        <div>
            <div className='roles'>
                {roles.map((role, index) => (
                    <div className='role' key={index}>
                        <p>{role.name}</p>
                        <div className='permissions'>
                            {permissions.map((permission, index) => {
                                const hasPermission = !!(role.RolePermission.find(e => e.permission === permission.id));
                                return (
                                    <PermissionCheckbox
                                        onChange={(event) => handleChangePerm(role, permission, event)}
                                        id={permission.id}
                                        key={index}
                                        checked={hasPermission}
                                        displayName={permission.name}
                                    />
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}