import { NextResponse } from "next/server"
import { ProcessComment } from "@/server/processor"
export async function POST(request) {
    const data = await request.json()
    await ProcessComment(data)
    return new NextResponse("OK", { status: 200 })
}