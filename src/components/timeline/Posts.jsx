import React from "react";
import Post from "./Post";

function Posts(props) {
  return (
    <div>
      {props.posts.map((post) => (
        <Post
          key={post.post_id}
          fullname={props.fullname}
          username={props.username}
          post={post}
          imageSrc={props.imageSrc}
        />
      ))}
    </div>
  );
}

export default Posts;
