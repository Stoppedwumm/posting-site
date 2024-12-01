"use server"
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL, { ssl: { rejectUnauthorized: false } });

// try creating table if not exists
sql(`CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, title VARCHAR(255), content VARCHAR(255))`)

export async function processPost(data) {
    console.log(data)
    console.log([data[0].title, data[0].file.cdnUrl])
    // Error [NeonDbError]: syntax error at or near ","
    console.log(`INSERT INTO posts (title, content) VALUES ('${data[0].title}", "${data[0].file.cdnUrl}')`)
    sql(`INSERT INTO posts (title, content) VALUES ('${data[0].title}', '${data[0].file.cdnUrl}')`).then(res => console.log(res))
    return
}

export async function getPosts() {
    const posts = await sql(`SELECT * FROM posts`)
    return posts
}