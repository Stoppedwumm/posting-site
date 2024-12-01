import { getPosts } from "@/server/processor"
export async function GET() {
    const posts = await getPosts()
    return new Response(JSON.stringify(posts))
}