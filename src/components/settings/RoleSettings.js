'use client'

import PermissionCheckbox from "@/components/settings/PermissionCheckbox.js";
import { useRoleContext } from "@/components/settings/roles.display.js";

export default function RoleSettings({roles, permissions}) {
    const { dispatch } = useRoleContext();

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
            dispatch(true);
        }
    }

    const handleDelete = async (role) => {
        const response = await fetch(`/api/roles/${role.id}`, {
            method: 'DELETE', credentials: 'include'
        });
    }

    return (
        <div>
            <div className='roles' style={{display: 'flex'}}>
                {roles.map((role, index) => (
                    <fieldset className='role' key={index}>
                        <legend>{role.name}</legend>
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
                                        disabled={role.system}
                                    />
                                )
                            })}
                        </div>
                        {!role.system && (
                            <button onClick={() => handleDelete(role)}>Delete Role</button>
                        )}
                    </fieldset>
                ))}
            </div>
        </div>
    )
}