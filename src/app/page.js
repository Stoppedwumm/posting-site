"use client"
import Post from "c/post";
import {getFlagsSecret, getPosts} from "@/server/processor"
import { use, useEffect, useState } from "react";
import { newFeature } from "@/flags";

export default function Home() {
  const [p, setPosts] = useState([])
  const [newFeatureEnabled, setNewFeatureEnabled] = useState(false)
  useEffect(() => {
    async function exec() {
      let posts = await getPosts()
      posts = posts.slice(0, 10)
      setPosts(posts)
      //console.log(posts)

    }
    exec()
  }, [])
  useEffect(() => {
    async function exec() {
      setNewFeatureEnabled(await newFeature())
    }
    exec()
  })
  return (
    <>
    <main>
      {newFeatureEnabled ? <p>new feature enabled</p> : undefined}
      <h1>Top 10 latest posts:</h1>
      {/* Only load 5 posts at a time */}
      {p.length > 0 ? p.map((post) => (
        <Post key={post.id} title={post.title} cdnUrl={post.content} tags={post.tags} id={post.id}/>
      )): <p>no posts yet</p>}
    </main>
    </>
  );
}