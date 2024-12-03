"use client"
import { getPosts, ProcessComment, GetComments } from "@/server/processor";
import Post from "c/post";
import Comment from "c/comment";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const [post, setPost] = useState(undefined)
    const [loaded, setLoaded] = useState(false)
    const [comments, setComments] = useState([])
    useEffect(() => {
        const searchParams = useSearchParams()
        async function exec() {
            const p = await getPosts();
            p.every((po) => {
                if (po.id == Number(searchParams.get("id"))) {
                    setPost(po);
                }
                return true
            })
            setLoaded(true)
        }
        exec()

    }, [])
    useEffect(() => {
        async function exec() {
            if (post != undefined) {
                const c = await GetComments(post.id);
                setComments(c)
            }
        }
        exec()
    }, [post])
    return (
        <>
            {post != undefined ?
                <Post key={post.id} title={post.title} cdnUrl={post.content} tags={post.tags} id={post.id}/>
                : loaded ? <p>post not found</p> : <p>loading...</p>}
            <h1>Comments</h1>
            <h2>Add a comment</h2>
            <form onSubmit={async (e) => {
                e.preventDefault()
                await ProcessComment([{
                    post_id: post.id,
                    comment: e.target.comment.value
                }])
                const c = await GetComments(post.id);
                setComments(c)
            }}>
                <input type="text" name="comment" />
                <button type="submit">submit</button>
            </form>
            {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        </>
    )
}