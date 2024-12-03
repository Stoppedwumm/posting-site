"use client";
import Upload from "c/uploadComp";
import { useState, useEffect, useTransition } from "react";
import { processPost, GetTags } from "@/server/processor";
import { useRouter } from "next/navigation";

export default function NewPost() {
    const router = useRouter();
    const [file, setFile] = useState(null); // Single file state
    const [selectedTags, setSelectedTags] = useState([]); // State to track selected tags
    const [tags, setTags] = useState([]); // State to store the fetched tags
    const [isPending, startTransition] = useTransition();
    const [title, setTitle] = useState("");

    // Fetch tags when the component mounts
    useEffect(() => {
        const fetchTags = async () => {
            const fetchedTags = await GetTags(); // Assuming GetTags fetches tags from the server
            setTags(fetchedTags); // Update the state with the fetched tags
        };
        fetchTags();
    }, []); // Empty dependency array to run only once when the component mounts

    const handleTagChange = (e) => {
        const { value, checked } = e.target;
        setSelectedTags((prevTags) => {
            if (checked) {
                return [...prevTags, value]; // Add tag if checked
            } else {
                return prevTags.filter((tag) => tag !== value); // Remove tag if unchecked
            }
        });
    };

    const submit = () => {
        if (!file) {
            alert("Please upload a file before submitting!");
            return;
        }
        startTransition(async () => {
            // Pass the selected tags along with the file and title
            await processPost([{ title: title, file, tags: selectedTags }]);
            router.push("/");
        });
    };

    return (
        <main className="d-flex justify-content-center flex-column align-items-center p-0">
            <h1 className="mb-3">New Post Page</h1>
            <h2 className="mb-3">Upload an image here</h2>
            <input 
                type="text" 
                placeholder="Title" 
                className="mb-3" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />
            <Upload
                onChange={(e) => {
                    if (e.isSuccess) {
                        const validEntry = e.allEntries.find((entry) => entry.isSuccess);
                        if (validEntry) {
                            //console.log(validEntry);
                            setFile(validEntry); // Replace with the single file
                        }
                    }
                }}
            />
            <div className="mb-3">
                <h3>Select Tags</h3>
                {tags.length > 0 ? (
                    tags.map((tag) => (
                        <div key={tag} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                value={tag}
                                onChange={handleTagChange}
                                id={`tag-${tag}`}
                            />
                            <label className="form-check-label" htmlFor={`tag-${tag}`}>
                                {tag}
                            </label>
                        </div>
                    ))
                ) : (
                    <p>Loading tags...</p>
                )}
            </div>
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
