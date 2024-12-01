"use client"
import Upload from "@/comps/uploadComp"
import { useState, useTransition } from "react";
import { processPost } from "@/server/processor";
import { useRouter } from "next/navigation";

export default function NewPost() {
    const router = useRouter()
    const [file, setFile] = useState(null); // Single file state
    
    const [isPending, startTransition] = useTransition();
    const [title, setTitle] = useState("");

    const submit = () => {
        if (!file) {
            alert("Please upload a file before submitting!");
            return;
        }
        startTransition(async () => {
            await processPost([{title: title, file}]); // Pass the single file in an array
            router.push("/");
        });
    };

    return (
        <main className="d-flex justify-content-center flex-column align-items-center p-0">
            <h1 className="mb-3">new post page</h1>
            <h2 className="mb-3">Upload an image here</h2>
            <input type="text" placeholder="Title" className="mb-3" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <Upload
                onChange={(e) => {
                    if (e.isSuccess) {
                        const validEntry = e.allEntries.find((entry) => entry.isSuccess);
                        if (validEntry) {
                            console.log(validEntry);
                            setFile(validEntry); // Replace with the single file
                        }
                    }
                }}
            />
            {isPending ? (
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="visually-hidden">Loading...</span>
                </button>
            ) : (
                <button className="btn btn-primary" type="button" onClick={submit}>
                    Submit
                </button>
            )}
        </main>
    );
}
