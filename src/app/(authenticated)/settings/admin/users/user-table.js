'use client';

import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";

import { IconPlus, IconRefresh } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserTable({ columns }) {
    const [users, setUsers] = useState([]);

    const table = useReactTable({
        data: users ?? [], columns, getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const fetchData = async () => {
        const response = await fetch('/api/users', {
            method: 'GET',
            credentials: 'include',
        });

        const body = await response.json();

        if (response.ok) {
            setUsers(body);
            console.log(body);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="grid items-center px-4 lg:px-6 gap-4">
            <div className="flex justify-start gap-2">

                <Link href='/settings/admin/users/create'>
                    <Button variant="outline" size="sm">
                        <IconPlus/>
                        <span className="hidden lg:inline">Create User</span>
                    </Button>
                </Link>

                <Button variant="outline" size="sm" onClick={fetchData}>
                    <IconRefresh/>
                    <span className="hidden lg:inline">Refresh</span>
                </Button>

            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    );
}