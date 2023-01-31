import React from "react";
import { useEffect } from "react";
import Post from "./Post";
import { useRetweets } from "../hooks/use-retweets";

function Posts({ post, loggedUsername, loggedUserId, following }) {
  const tweets = useRetweets();
  console.log(tweets);

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
        retweets={post.retweets}
        loggedUserId={loggedUserId}
      />
    </div>
  );
}

export default Posts;
