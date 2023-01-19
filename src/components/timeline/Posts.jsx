import React from "react";
import Post from "./Post";

function Posts({ post }) {
  return (
    <div>
      <Post
        fullname={post.fullname}
        username={post.username}
        imageSrc={post.imageSrc}
        caption={post.caption}
        post_image={post.postImage}
        id={post.docId}
      />
    </div>
  );
}

export default Posts;
