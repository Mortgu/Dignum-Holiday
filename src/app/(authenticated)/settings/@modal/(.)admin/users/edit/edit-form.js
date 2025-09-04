"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button.jsx";
import { useRouter } from "next/navigation.js";

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string(),
    email: z.email(),
})

export function ProfileForm({user}) {
    const router = useRouter();
    console.log(user)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values) {
        const id = user.id;

        const response = await fetch(`/api/users/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });

        if (response.ok) {
            router.back();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <div className='flex gap-4 flex-wrap'>
                    <FormField control={form.control} name="firstName" render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="lastName" render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="E-Mail" {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="role" render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <Button type="submit">Save Changes</Button>
            </form>
        </Form>
    )
}