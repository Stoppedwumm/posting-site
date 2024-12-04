"use server"
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL, { ssl: { rejectUnauthorized: false } });

export async function GrabFlagsEnabled(flag) {
    const flags = await sql(`SELECT * FROM flags WHERE title = '${flag}'`)	
    if (flags.length > 0) return flags[0].enabled
    else return undefined
    // throw new Error("Invalid parsing of JS")
}