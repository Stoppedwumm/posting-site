import React from "react";
import Link from "next/link";
export function Header({ }) {
    return <header className="d-flex p-2 flex-row mb-3 align-items-baseline">
        <h1><Link href="/" className="white">random post page (rpp)</Link></h1>
        <div style={{
            marginLeft: "auto"
        }}>
            <Link href="/newPost" className="btn btn-primary" style={{
                marginLeft: "100px"
            }}>new post</Link>
            <Link href="/filter" className="btn btn-primary" style={{
                marginLeft: "auto"
            }}>filter</Link>
        </div>

    </header>;
}
