import React from "react";
import { useEffect } from "react";
import Post from "./Post";

function Posts({ post, loggedUsername, loggedUserId, following }) {
  return (
    <div>
      <Post
        loggedUserName={loggedUsername}
        fullname={post.fullname}
        username={post.username}
        imageSrc={post.imageSrc}
        caption={post.caption}
        post_image={post.postImage}
        docId={post.docId}
        userId={post.userId}
        allLikes={post.likes}
        postId={post.postId}
        isRetweet={post.type === "retweet" ? true : false}
        retweetUsername={post.tweetedUsername || ""}
        retweetFullname={post.tweetedFullname || ""}
        loggedUserId={loggedUserId}
      />
    </div>
  );
}

export default Posts;
