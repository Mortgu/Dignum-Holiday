import { NextResponse } from "next/server";
import { withAuthorization } from "@/app/lib/authentication.js";

function testFunction(request, context, user) {
    console.log('user:', user);
    return NextResponse.json({
        message: `User ${user.email} is requesting all users.`
    })
}

export const GET = withAuthorization(testFunction, 'users:create');
