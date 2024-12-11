import { getPosts } from "@/server/processor"
/**
 * Handles GET requests to fetch all posts.
 *
 * This function retrieves all posts from the server using the `getPosts` function
 * and returns them as a JSON response.
 *
 * @returns {Promise<Response>} A promise resolving to a Response object containing
 * the JSON stringified posts.
 */

export async function GET() {
    const posts = await getPosts()
    return new Response(JSON.stringify(posts))
}