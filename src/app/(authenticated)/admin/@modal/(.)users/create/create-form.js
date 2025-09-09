'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userFormSchema } from "@/app/(authenticated)/admin/@modal/(.)users/user-form.js";
import UserForm from "@/components/user-form.js";

export function CreateUserForm({ roles }) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: 1,
            workingHours: 0,
            vacationEntitlement: 0,
            salary: 0,
        }
    });

    const onSubmit = async (values) => {
        console.log(values)
        const response = await fetch('/api/users/', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            router.back();
            router.refresh();
        }
    }

    return <UserForm form={form} onSubmit={onSubmit} roles={roles} />
}