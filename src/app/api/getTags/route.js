import { GetTags } from "@/server/processor"
export async function GET() {
    const tags = await GetTags()
    return new Response(JSON.stringify(tags))
}