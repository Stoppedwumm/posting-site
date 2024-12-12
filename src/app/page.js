"use client"
import Post from "c/post";
import { getPosts, getUser, setUser as SU } from "@/server/processor"
import { useEffect, useState } from "react";
import { GrabFlagsEnabled } from "@/server/serverCFG";
import fbConfig from '@/server/firebase';
import { signInAnonymously, getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';

/**
 * The Home component displays a list of posts and handles user authentication.
 * 
 * It fetches the top 10 latest posts and displays them in a list format. 
 * Users can anonymously sign in via Firebase Auth and their details are fetched 
 * from the server. It also checks for enabled feature flags.
 * 
 * The component uses React hooks for managing state and side effects:
 * - `useState` to store posts, enabled flags, and user information.
 * - `useEffect` to perform asynchronous actions on component mount and when the user state changes.
 * 
 * The rendered component includes:
 * - A list of the top 10 latest posts, each with a like button.
 * - A section for trending posts, sorted by the number of likes.
 * 
 * Posts can be liked by authenticated users, updating the like count.
 */
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
        <top10>
        {p.length > 0 ? p.map((post) => (
          <Post key={post.id} title={post.title} cdnUrl={post.content} tags={post.tags} id={post.id} likes={post.likes} onLikeClick={() => {
            if (user != undefined) {
              SU(user.uid, post.id)
            }
          }} />
        )) : <p>no posts yet</p>}
        </top10>
        <h1>Trending:</h1>
        {/* Only load 5 posts at a time */}
        <trending>
          {p.length > 0 ? p.sort((a, b) => (b.likes - a.likes)).map((post) => (
            <Post key={post.id} title={post.title} cdnUrl={post.content} tags={post.tags} id={post.id} likes={post.likes} onLikeClick={() => {
              if (user != undefined) {
                SU(user.uid, post.id)
              }
            }} />
          )) : <p>no posts yet</p>}
        </trending>
      </main>
    </>
  );
}