import { NextResponse } from "next/server"
import { ProcessComment } from "@/server/processor"
/**
 * Handles comment submissions.
 * @param {Request} request The Next.js request object.
 * @returns {Promise<NextResponse>} A promise resolving to a NextResponse, with status 200 and body "OK".
 */
export async function POST(request) {
    const data = await request.json()
    await ProcessComment(data)
    return new NextResponse("OK", { status: 200 })
}