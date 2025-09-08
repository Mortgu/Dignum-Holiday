'use client';

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";

export default function UserForm({ form, onSubmit, roles }) {
    return (
        <Form {...form}>
            <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex gap-4 flex-wrap'>
                    <FormField control={form.control} name='firstName' render={({ field }) => (
                        <FormItem className='flex-auto'>
                            <FormControl>
                                <Input placeholder="First Name" {...field} value={field.value ?? ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="lastName"  render={({field}) => (
                        <FormItem className='flex-auto'>
                            <FormControl>
                                <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem className='flex-auto'>
                        <FormControl>
                            <Input type='email' placeholder="E-Mail" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                <div className='flex gap-4 flex-wrap'>
                    <FormField control={form.control} name='workingHours' render={({ field }) => (
                        <FormItem className='flex-auto'>
                            <FormControl>
                                <Input type='number' placeholder="Working hours" {...field}  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="vacationEntitlement"  render={({field}) => (
                        <FormItem className='flex-auto'>
                            <FormControl>
                                <Input type='number' placeholder="Vacation Entitlement" {...field}  />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="salary"  render={({field}) => (
                        <FormItem className='flex-auto'>
                            <FormControl>
                                <Input type='number' placeholder="Salary" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>

                <div className='flex gap-4'>
                    <FormField control={form.control} name="password" render={({field}) => (
                        <FormItem className='flex-auto'>
                            <FormControl>
                                <Input type='password' placeholder='Password'  {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="role" render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Select {...field} onValueChange={(value) => field.onChange(parseInt(value))}
                                        value={field.value?.toString()}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Role"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles?.map((role, index) => (
                                            <SelectItem key={index} value={role.id.toString()}>
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                </div>
                <Button type="submit">Save</Button>
            </form>
        </Form>
    )
}