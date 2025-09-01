'use client'

import PermissionCheckbox from "@/components/PermissionCheckbox.js";

export default function RoleSettings({ roles, permissions }) {
    console.log(roles)

    return (
        <div className='roles'>
            {roles.map((role, index) => (
                <div className='role' key={index}>
                    <p>{role.name}</p>
                    <div className='permissions'>
                        {permissions.map((permission, index) => {
                            const hasPermission = !!(role.RolePermission.find(e => e.permission === permission.id));
                            console.log("hasPermission", hasPermission)
                            return (
                                <PermissionCheckbox onChange={(event) => {
                                    console.log(permission.displayName)
                                }} key={index} checked={hasPermission} displayName={permission.displayName} />
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}