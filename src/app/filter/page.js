"use client"
import { getPosts, GetTags } from "@/server/processor";
import { useState, useEffect, use } from "react";
import Post from "@/comps/post"

export default function Filter() {
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
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
                <Post key={post.id} title={post.title} cdnUrl={post.content} tags={post.tags}/>
            )})}
        </div>
    );
    // <p>{posts.length} posts</p>
}