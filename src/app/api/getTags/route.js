import { GetTags } from "@/server/processor"
/**
 * Handles GET requests to fetch tags.
 *
 * This function retrieves tags from the server using the `GetTags` function
 * and returns them as a JSON response.
 *
 * @returns {Promise<Response>} A promise resolving to a Response object containing
 * the JSON stringified tags.
 */
export async function GET() {
    const tags = await GetTags()
    return new Response(JSON.stringify(tags))
}