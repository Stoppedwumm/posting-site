"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import "@/custom.css";
import { Suspense, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance"
import firebaseConfig from "@/server/firebase";
/**
 * The root layout component.
 *
 * This component is the root of the Next.js tree, and is rendered once per
 * request. It is responsible for rendering the HTML document structure.
 *
 * @param {{ children: ReactNode[] }} props The props object.
 * @returns {ReactElement} The component.
 */

export default function RootLayout({ children }) {
  useEffect(() => {
    async function exec() {
      const app = initializeApp(firebaseConfig)
      const perf = getPerformance(app);
    }
  })
  return (
    <html lang="en" data-bs-theme="dark">
      {/* The body element contains all the content of the page. */}
      <head>
        <title>rpp</title>
      </head>
      <body>
        <header className="d-flex p-2 flex-row mb-3 align-items-baseline">
          <h1><Link href="/" className="white">random post page (rpp)</Link></h1>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/newPost" className="btn btn-primary" style={{ marginLeft: "100px" }}>new post</Link>
            <Link href="/filter" className="btn btn-primary" style={{ marginLeft: "auto" }}>filter</Link>
          </div>

        </header>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
