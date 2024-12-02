import { getPosts, GetTags } from "@/server/processor";

export default async function Filter() {
    const posts = await getPosts();
    return (
        <div>
            <h1>Filter</h1>
            <p>{posts.length} posts</p>
        </div>
    );
}