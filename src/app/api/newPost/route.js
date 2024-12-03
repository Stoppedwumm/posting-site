import { processPost } from "@/server/processor"
import { NextResponse } from "next/server"

export async function POST(request) {
    const data = await request.json()
    //console.log(data)
    await processPost(data)
    return new NextResponse("OK", { status: 200 })
}

export async function GET() {
    return new NextResponse("Invalid method", { status: 405 })
}