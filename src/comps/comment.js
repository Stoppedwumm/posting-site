/**
 * A React component to display a single comment.
 * @param {{comment: {id: number, post_id: number, content: string}}} props
 * @returns {JSX.Element}
 */
export default function Comment({comment}) {
    return (
        <div className="card m-3 p-3 w-50 text-center">
            <div className="card-body">
                <p className="card-text">{comment.content}</p>
            </div>
        </div>
    )
}