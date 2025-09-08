'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userFormSchema } from "@/app/(authenticated)/settings/@modal/(.)admin/users/user-form.js";
import UserForm from "@/components/user-form.js";

export function CreateUserForm({ roles }) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(userFormSchema),
    });

    const onSubmit = async (values) => {
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