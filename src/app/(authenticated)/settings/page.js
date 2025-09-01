import { withPermission } from "@/app/lib/authentication.js";

import RoleSettings from "@/components/settings/RoleSettings.js";
import prisma from "@/app/lib/prisma.js";
import Permission from "@/app/(authenticated)/Permission.js";
import RoleCreationForm from "@/components/settings/RoleCreationForm.js";
import { RoleContextProvider } from "@/components/settings/roles.display.js";

async function SettingsPage() {
    const roles = await prisma.roles.findMany({
        where: {system: false}, include: {RolePermission: true}
    });

    const permissions = await prisma.permissions.findMany({
        select: {id: true, name: true}
    });

    const users = await prisma.users.findMany({
        where: { system: false }
    });

    return (
        <div>
            <Permission permission='roles:create'>
                <fieldset>
                    <legend>Role Creation</legend>
                    <RoleCreationForm permissions={permissions} />
                </fieldset>
            </Permission>
            <Permission permission='roles:modify'>
                <fieldset>
                    <legend>Roles</legend>
                    <RoleContextProvider>
                        <RoleSettings roles={roles} permissions={permissions}/>
                    </RoleContextProvider>
                </fieldset>
            </Permission>

            <fieldset>
                <legend>Users</legend>
                <form>
                    <input type='text' placeholder='first name' />
                    <input type='text' placeholder='last name' />
                    <input type='email' placeholder='email' />
                    <input type='number' placeholder='working hours' />
                    <input type='number' placeholder='holidays' />
                    <select>
                        {roles.map((role, index) => (
                            <option key={index}>{role.name}</option>
                        ))}
                    </select>

                    <button type='submit'>Create User</button>
                </form>
                <fieldset>
                    <legend>Users</legend>
                    <div>
                        {users.map((user, index) => (
                            <div key={index} style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                <p>{user.firstName} {user.lastName}</p>
                                <p>{user.email}</p>
                                <select>
                                    {roles.map((role, index) => {
                                        return (
                                            <option autoFocus={user.role.id === role.id} key={index}>{role.name}</option>
                                        )
                                    })}
                                </select>
                                <button type='submit'>delete</button>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </fieldset>
        </div>
    )
}

export default withPermission(SettingsPage, 'settings:view')
