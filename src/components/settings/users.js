"use client";

import './users.scss';
import { useSettingsContext } from "@/components/settings/settings.js";
import { Fragment } from "react";

export default function Users({ users, roles }) {
    return (
        <fieldset className='settings-users'>
            <legend>Users</legend>
            <UserCreationForm roles={roles} />
            <UsersDisplay users={users} roles={roles} />
        </fieldset>
    );
}

/** Displays all users */
export function UsersDisplay({ users, roles }) {
    console.log(users, roles)

    const handleModifyUserRole = async (userId, event) => {
        const newRoleId = event.target.value;

        const response = await fetch(`/api/users/${userId}`, {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: parseInt(newRoleId) })
        });

        if (response.ok) {
            console.log('ok');
        }
    }

    return (
        <div className='settings-users-display'>
            {users.map((user, index) => (
                <div key={index} className='settings-user'>
                    <p className='settings-user-id'>{user.id}</p>
                    <p className='settings-user-email'>{user.email}</p>
                    <p className='settings-user-name'>{user.firstName} {user.lastName}</p>

                    {!user.system && (
                        <Fragment>
                            <p className='settings-user-name'>{user.workingHours}</p>
                            <p className='settings-user-name'>{user.vacationEntitlement}</p>

                            <select className='settings-user-role' onChange={(event) => handleModifyUserRole(user.id, event)}>
                                {roles.map((role, index) => (
                                    <option key={index} value={role.id} selected={user.role === role.id}>{role.name}</option>
                                ))}
                            </select>
                        </Fragment>
                    )}

                    {user.system && (
                        <p className='settings-user-role'>{user.roleRelation.name}</p>
                    )}

                    {!user.system && (
                        <div className='settings-user-action'>
                            <button>delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export function UserCreationForm({ roles }) {
    const { dispatch } = useSettingsContext();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData)

        console.log(formValues);

        const response = await fetch('/api/users', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formValues)
        });

        if (response.ok) {
            const data = await response.json();
            dispatch({
                action: 'update_user_display', payload: data
            });
        }
    }

    return (
        <form className='settings-users-form' onSubmit={handleSubmit}>
            <input type='text' name='firstName' placeholder='first name' />
            <input type='text' name='lastName' placeholder='last name' />
            <input type='email' name='email' placeholder='email' />
            <input type='number' name='workingHours' placeholder='working hours' />
            <input type='number' name='vacationEntitlement' placeholder='holidays' />
            <select>
                {roles.map((role, index) => (
                    <option key={index}>{role.name}</option>
                ))}
            </select>
            <input type='password' name='password' placeholder='password' />

            <button type='submit'>Create User</button>
        </form>
    )
}