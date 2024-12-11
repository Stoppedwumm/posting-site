"use server"
import { neon } from "@neondatabase/serverless";
import {app as fbApp} from "./fbdriver"
import * as fbdb from "firebase/database"
import 'firebase/firestore';
import "firebase-admin/app";
const sql = neon(process.env.DATABASE_URL, { ssl: { rejectUnauthorized: false } });
let tags = ["memes", "funny", "awards", "wat?", "genau diggi", "wieso?", "hör mit deinen augen", "mit herzen von yannick", "gejoostet", "julius", "CLEEEEMMMMMEEEEENNS", "hannes"]
// try creating table if not exists
sql(`CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, title VARCHAR(255), content VARCHAR(255), tags TEXT[])`)
sql('CREATE TABLE IF NOT EXISTS comments (id SERIAL PRIMARY KEY, post_id INTEGER, content VARCHAR(255))')

/**
 * Process a new post and insert it into the database.
 * @param {Object[]} data A single-element array containing the new post data.
 * @param {string} data[0].title The title of the post.
 * @param {Object} data[0].file The file data, containing the `cdnUrl` property.
 * @param {string} data[0].file.cdnUrl The URL of the uploaded file on the CDN.
 * @param {string[]} data[0].tags An array of tags to associate with the post.
 * @returns {Object[]} The original data.
 */
export async function processPost(data) {
    // Assume data[0].tags is an array of tags
    const tagsArray = data[0].tags; // This should be an array like ["tag1", "tag2", "tag3"]
    
    // Handle empty tags array
    let tagsString;
    if (tagsArray && tagsArray.length > 0) {
        // Convert the array into a PostgreSQL array format
        tagsString = `{${tagsArray.join(',')}}`;
    } else {
        // If the tags array is empty, use an empty array in PostgreSQL
        tagsString = '{}';
    }

    // Perform the SQL query with tags included
    const query = `INSERT INTO posts (title, content, tags, likes) VALUES ('${data[0].title}', '${data[0].file.cdnUrl}', '${tagsString}', 0)`;

    try {
        const res = await sql(query); // Assuming sql is a function that runs the query
        //console.log(res); // Log the result for debugging
    } catch (err) {
        console.error("Error inserting post:", err); // Handle errors
    }

    return data;
}

export async function getPosts() {
    const posts = await sql(`SELECT * FROM posts`)
    return posts.reverse()
}
export async function GetTags() {
    return tags
}
export async function ProcessComment(data) {
    const post_id = data[0].post_id
    const comment = data[0].comment
    const query = `INSERT INTO comments (post_id, content) VALUES (${post_id}, '${comment}')`
    try {
        const res = await sql(query); // Assuming sql is a function that runs the query
        //console.log(res); // Log the result for debugging
    } catch (err) {
        console.error("Error inserting post:", err); // Handle errors
    }
    return data
}

export async function GetComments(postId) {
    const comments = (await sql(`SELECT * FROM comments WHERE post_id = ${postId}`)).reverse()
    return comments
}

export async function getFlagsSecret() {
    return process.env.FLAGS_SECRET
}

export async function getUser(uid) {
    const db = fbdb.ref(fbdb.getDatabase(fbApp, "https://st-post-5f692-default-rtdb.europe-west1.firebasedatabase.app"), "/users/" + uid)
    const val = (await fbdb.get(db)).val()
    let result = undefined
    if (val == null || val == "test") {
        fbdb.set(db, JSON.stringify({
            "likes": []
        }))
        result = {
            "likes": []
        }
    } else {
        result = JSON.parse(val)
    }
    return result
}

export async function setUser(uid, like) {
    const db = fbdb.ref(fbdb.getDatabase(fbApp, "https://st-post-5f692-default-rtdb.europe-west1.firebasedatabase.app"), "/users/" + uid)
    const val = (await fbdb.get(db)).val()
    
    console.log(val)
    if (val == null || val==undefined || val == "test") {
        fbdb.set(db, JSON.stringify({
            "likes": [like]
        }))
        console.log(await sql(`UPDATE posts SET likes = likes + 1 WHERE id = ${like}`))
    } else {
        let likes = JSON.parse(val).likes
        console.log("Likes:", likes)
        console.log(likes.find((x) => x == like))
        if (like && likes.find((x) => x == like) == undefined) {
            likes.push(like)
            console.log(await sql(`UPDATE posts SET likes = likes + 1 WHERE id = ${like}`))
        } else {
            console.log("Already liked")
            return false
        }
        fbdb.set(db, JSON.stringify({
            "likes": likes
        }))
    }
}

