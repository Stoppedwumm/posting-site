import React from "react";
export function Likebutton({
  onLikeClick,
  likes
}) {
  return <button className="btn btn-primary" onClick={onLikeClick}>likes: {likes}</button>;
}
  