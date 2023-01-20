import React from "react";
import Post from "./Post";

function Posts({ post }) {
  console.log(post);
  return (
    <div>
      <Post
        fullname={post.fullname}
        username={post.username}
        imageSrc={post.imageSrc}
        caption={post.caption}
        post_image={post.postImage}
        docId={post.docId}
        userId={post.userId}
        allLikes={post.likes}
      />
    </div>
  );
}

export default Posts;
