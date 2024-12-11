import { NextResponse } from "next/server";
import {URL} from "node:url"
export async function GET(req, res) {
    const uuid = new URL(req.url).searchParams.get('uuid');

    try {
        const response = await fetch(`https://ucarecdn.com/${uuid}/-/format/webp/`);
        const buffer = await response.arrayBuffer();
        return new NextResponse(buffer);
    } catch (error) {
        console.error(error);
        res.status(404).send('Image not found');
    }
}