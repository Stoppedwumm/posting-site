"use server"
import { neon } from "@neondatabase/serverless";
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
    const query = `INSERT INTO posts (title, content, tags) VALUES ('${data[0].title}', '${data[0].file.cdnUrl}', '${tagsString}')`;

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