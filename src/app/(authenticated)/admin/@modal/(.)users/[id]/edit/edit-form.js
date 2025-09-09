'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useRouter } from "next/navigation.js";
import UserForm from "@/components/user-form.js";
import { userFormSchema } from "@/app/(authenticated)/admin/@modal/(.)users/user-form.js";


export function ProfileForm({user, roles}) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            workingHours: user.workingHours,
            vacationEntitlement: user.vacationEntitlement,
            salary: user.salary,
            password: user.password,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values) {
        const id = user.id;
        console.log(values)

        const response = await fetch(`/api/users/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });

        if (response.ok) {
            router.back();
        }
    }

    return <UserForm form={form} onSubmit={onSubmit} roles={roles} />
}