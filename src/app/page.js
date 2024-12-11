"use client"
import Post from "c/post";
import { getPosts, getUser, setUser as SU } from "@/server/processor"
import { useEffect, useState } from "react";
import { GrabFlagsEnabled } from "@/server/serverCFG";
import fbConfig from '@/server/firebase';
import { signInAnonymously, getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';

export default function Home() {
  const [p, setPosts] = useState([])
  const [enabledFlags, setFlags] = useState([])
  const [user, setUser] = useState(undefined)
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
  useEffect(() => {
    async function exec() {
      const app = initializeApp(fbConfig)
      const auth = getAuth(app)
      const login = await signInAnonymously(auth)
      setUser(login.user)
    }
    exec()
  }, [])
  useEffect(() => {
    async function exec() {
      if (user != undefined) {
        console.log(await getUser(user.uid))
      }
    }
    exec()
  }, [user])
  return (
    <>
      <main>
        <h1>Top 10 latest posts:</h1>
        {/* Only load 5 posts at a time */}
        {p.length > 0 ? p.map((post) => (
          <Post key={post.id} title={post.title} cdnUrl={post.content} tags={post.tags} id={post.id} likes={post.likes} onLikeClick={() => {
            if (user != undefined) {
              SU(user.uid, post.id)
            }
          }} />
        )) : <p>no posts yet</p>}
        <h1>Trending:</h1>
        {/* Only load 5 posts at a time */}
        {p.length > 0 ? p.sort((a, b) => (b.likes - a.likes)).map((post) => (
          <Post key={post.id} title={post.title} cdnUrl={post.content} tags={post.tags} id={post.id} likes={post.likes} onLikeClick={() => {
            if (user != undefined) {
              SU(user.uid, post.id)
            }
          }} />
        )) : <p>no posts yet</p>}
      </main>
    </>
  );
}