import React, { useEffect } from "react";
import Home from "./Home";
// import { getPosts } from "../../firebase/services";
import usePosts from "../hooks/use-posts";
import Posts from "./Posts";

function TimeLine({ userDetails }) {
  const { imageSrc, username, fullname, uid, following } = userDetails;

  const { posts } = usePosts(following);
  console.log(posts);

  return (
    <div className="basis-1/2">
      <div className="p-2">
        <p className="font-semibold text-xl mb-2">Home</p>
        <Home avatarUrl={imageSrc} username={username} fullname={fullname} />
      </div>
      {following.length < 0 ? (
        <p>No posts follow someone</p>
      ) : (
        <div>
          {posts && posts.map((post) => <Posts key={post.docId} post={post} />)}
        </div>
      )}
    </div>
  );
}

export default TimeLine;
