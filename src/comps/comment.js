export default function Comment({comment}) {
    return (
        <div className="card m-3 p-3 w-50 text-center">
            <div className="card-body">
                <p className="card-text">{comment.content}</p>
            </div>
        </div>
    )
}