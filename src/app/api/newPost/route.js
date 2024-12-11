import { processPost } from "@/server/processor"
import { NextResponse } from "next/server"

/**
 * Handles new post submissions.
 * @param {Request} request The Next.js request object.
 * @returns {Promise<NextResponse>} A promise resolving to a NextResponse, with status 200 and body "OK".
 */
export async function POST(request) {
    const data = await request.json()
    //console.log(data)
    await processPost(data)
    return new NextResponse("OK", { status: 200 })
}

/**
 * Handles GET requests to the new post endpoint.
 * 
 * This function returns a 405 response indicating that the GET method
 * is not allowed for this endpoint. It is intended to be used for POST
 * requests only.
 * 
 * @returns {Promise<NextResponse>} A promise resolving to a NextResponse
 * with status 405 and body "Invalid method".
 */
export async function GET() {
    return new NextResponse("Invalid method", { status: 405 })
}