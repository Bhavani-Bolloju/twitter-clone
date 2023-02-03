import React from "react";
import { useEffect } from "react";
import Post from "./Post";

function Posts({ post, loggedUsername, loggedUserId, following }) {
  // console.log(post.postDocId, "post");

  return (
    <div>
      <Post
        fullname={post.fullname}
        username={post.username}
        imageSrc={post.imageSrc}
        caption={post.caption}
        post_image={post.postImage}
        userId={post.userId}
        postDocId={post.postDocId}
        docId={post.docId}
        allLikes={post.likes}
        postId={post.postId}
        isRetweet={post.type === "retweet" ? true : false}
        retweetUsername={post.tweetedUsername || ""}
        retweetFullname={post.tweetedFullname || ""}
        following={following}
      />
    </div>
  );
}

export default Posts;
