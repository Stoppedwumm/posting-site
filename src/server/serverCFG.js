"use server"
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL, { ssl: { rejectUnauthorized: false } });

/**
 * Grabs the enabled state of a flag from the database
 * @param {string} flag the name of the flag to retrieve
 * @returns {boolean|undefined} the enabled state of the flag, or undefined if it does not exist
 */
export async function GrabFlagsEnabled(flag) {
    const flags = await sql(`SELECT * FROM flags WHERE title = '${flag}'`)	
    if (flags.length > 0) return flags[0].enabled
    else return undefined
    // throw new Error("Invalid parsing of JS")
}