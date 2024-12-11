import React from "react";
/**
 * A React component that renders a like button.
 * 
 * @param {Object} props - The props object.
 * @param {function} props.onLikeClick - The function to execute when the button is clicked.
 * @param {number} props.likes - The number of likes to display on the button.
 * @returns {JSX.Element} A button element with the like count and click handler.
 */
export function Likebutton({
  onLikeClick,
  likes
}) {
  return <button className="btn btn-primary" onClick={onLikeClick}>likes: {likes}</button>;
}
  