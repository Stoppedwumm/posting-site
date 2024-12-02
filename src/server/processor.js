"use server"
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL, { ssl: { rejectUnauthorized: false } });
let tags = ["memes", "funny"]
// try creating table if not exists
sql(`CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, title VARCHAR(255), content VARCHAR(255))`)

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
        console.log(res); // Log the result for debugging
    } catch (err) {
        console.error("Error inserting post:", err); // Handle errors
    }

    return data;
}

export async function getPosts() {
    const posts = await sql(`SELECT * FROM posts`)
    console.log(posts)
    return posts.reverse()
}
export async function GetTags() {
    return tags
}