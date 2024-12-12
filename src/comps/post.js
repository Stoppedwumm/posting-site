import { Likebutton } from './likebutton';
import Link from "next/link";

/**
 * A React component to display a post.
 * @param {{title: string, cdnUrl: string, tags: string[], id: number, likes: number, onLikeClick: (event: React.MouseEvent<HTMLButtonElement>) => void}} props
 * @returns {JSX.Element}
 */
export default function Post({title, cdnUrl, tags, id, likes, onLikeClick}) {
    return (
        <div className="card m-3 p-3 w-50 text-center" key={id} id={id}>
            <div className="card-body">
                <Link href={`/postView?id=${id}`} className="white"><h3 className="card-title">{title}</h3></Link>
                <Link href={(cdnUrl.replace("https://ucarecdn.com/", "/api/cdnImg?uuid="))}>
                <img src={cdnUrl + "-/format/webp/"} className="card-img-top" style={{maxHeight: "700px", maxWidth: "500px"}} alt="..." />
                </Link>
                <h3>Tags:</h3>
                <p className="card-text">{tags.map((tag, index) => <><span key={tag + " "+index}>{tag}</span><br /></>)}</p>
                <Likebutton   onLikeClick={onLikeClick} likes={likes}  />
            </div>
        </div>
    );
}