import { FetchRequest, HandleApiError } from "@/app/api/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try{
    const body = await request.json();
    const {status, data} = await FetchRequest("/auth/login", {
        method: "POST",
        body: body,
        request: request,
    })
    return NextResponse.json(data, {status: status,})
    }catch(error){
        return HandleApiError(error);
    }
}   w