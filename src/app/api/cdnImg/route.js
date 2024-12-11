import { NextResponse } from "next/server";
import {URL} from "node:url"
/**
 * Returns the image with the given UUID from Ucarecdn in webp format.
 * If the image is not found, returns a 404 status with the message "Image not found".
 * @param {http.IncomingMessage} req - The incoming request message.
 * @param {http.ServerResponse} res - The server response object.
 */
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