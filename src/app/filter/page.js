"use client"
import { getPosts, GetTags } from "@/server/processor";
import { useState, useEffect, use } from "react";
import Post from "c/post"
import fbConfig from '@/server/firebase';
import { signInAnonymously, getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app'

/**
 * The Filter component is responsible for rendering a filter page.
 * It fetches all posts and tags from the server and stores them in state.
 * It also handles anonymous sign-in and user data fetching.
 * The component renders a list of tags as checkboxes, and a list of posts.
 * The posts are filtered based on the selected tags.
 * When the user clicks on a tag, the posts are re-filtered.
 * When the user clicks on a post's like button, the like count is updated in the server.
 */
export default function Filter() {
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        async function exec() {
            const posts = await getPosts()
            setPosts(posts)
            const tags = await GetTags()
            setTags(tags)
        }
        exec()
    }, [])
    useEffect(() => {
        function filterPosts() {
            const filteredPosts = posts.filter((post) => {
                return selectedTags.every((tag) => post.tags.includes(tag))
            })
            setFilteredPosts(filteredPosts)
        }
        filterPosts()
    }, [selectedTags, posts])
    useEffect(() => {
        async function exec() {
          const app = initializeApp(fbConfig)
          const auth = getAuth(app)
          const login = await signInAnonymously(auth)
          setUser(login.user)
        }
        exec()
      }, [])
    return (
        <div>
            <h1>Filter</h1>
            <h2>Select tags</h2>
            {tags.map((tag) => {return (
                <>
                <input key={tag} type="checkbox" id={tag} autoComplete="off" onChange={(e) => {if (e.target.checked) {setSelectedTags([...selectedTags, tag])} else {setSelectedTags(selectedTags.filter((t) => t !== tag))}}}/>
                <label htmlFor={tag} key={"label " + tag}>{tag}</label>
                <br></br>
                </>
            )})}
            <h2>Posts</h2>
            {filteredPosts.map((post) => {return (
                <Post key={post.id} title={post.title} cdnUrl={post.content} tags={post.tags} id={post.id} likes={post.likes} onLikeClick={() => {
                    if (user != undefined) {
                      SU(user.uid, post.id)
                    }
                  }} />
            )})}
        </div>
    );
    // <p>{posts.length} posts</p>
}