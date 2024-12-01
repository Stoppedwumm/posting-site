export default function Post({title, cdnUrl}) {
    return (
        <div className="card m-3 p-3 w-50 text-center">
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <img src={cdnUrl} className="card-img-top" style={{maxHeight: "700px", maxWidth: "500px"}} alt="..." />
            </div>
        </div>
    );
}