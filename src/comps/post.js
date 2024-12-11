import { Likebutton } from './likebutton';
import Link from "next/link";

export default function Post({title, cdnUrl, tags, id, likes, onLikeClick}) {
    return (
        <div className="card m-3 p-3 w-50 text-center">
            <div className="card-body">
                <Link href={`/postView?id=${id}`} className="white"><h3 className="card-title">{title}</h3></Link>
                <img src={cdnUrl + "-/format/webp/"} className="card-img-top" style={{maxHeight: "700px", maxWidth: "500px"}} alt="..." />
                <h3>Tags:</h3>
                <p className="card-text">{tags.map((tag, index) => <><span key={tag + " "+index}>{tag}</span><br /></>)}</p>
                <Likebutton   onLikeClick={onLikeClick} likes={likes}  />
            </div>
        </div>
    );
}