"use client"
import Post from "c/post";
import {getFlagsSecret, getPosts} from "@/server/processor"
import { use, useEffect, useState } from "react";
import { GrabFlagsEnabled } from "@/server/serverCFG";

export default function Home() {
  const [p, setPosts] = useState([])
  useEffect(() => {
    async function exec() {
      let posts = await getPosts()
      posts = posts.slice(0, 10)
      setPosts(posts)
      //console.log(posts)
      console.log(await GrabFlagsEnabled("example"))
    }
    exec()
  }, [])
  return (
    <>
    <main>
      <h1>Top 10 latest posts:</h1>
      {/* Only load 5 posts at a time */}
      {p.length > 0 ? p.map((post) => (
        <Post key={post.id} title={post.title} cdnUrl={post.content} tags={post.tags} id={post.id}/>
      )): <p>no posts yet</p>}
    </main>
    </>
  );
}