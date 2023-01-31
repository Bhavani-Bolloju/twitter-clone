import React, { useEffect } from "react";
import Home from "./Home";
import { getPosts } from "../../firebase/services";
import usePosts from "../hooks/use-posts";
import Posts from "./Posts";
import { db } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useId } from "react";

function TimeLine({ userDetails }) {
  const { imageSrc, username, fullname, uid, following } = userDetails;

  const id = useId();

  const { posts } = usePosts(getPosts, following, uid);

  console.log(posts);

  const userTweetHandler = async function (text) {
    console.log(text);

    if (text.trim() === "") return;

    await addDoc(collection(db, "posts"), {
      caption: text,
      comments: [],
      likes: [],
      postImage: "",
      postId: id,
      username,
      userId: uid,
    });
  };

  return (
    <div className=" border w-[100%] border-gray-200">
      <div className="p-2">
        <Home
          avatarUrl={imageSrc}
          username={username}
          onReply={userTweetHandler}
          fullname={fullname}
        />
      </div>
      {following.length < 0 ? (
        <p>No posts follow someone</p>
      ) : (
        <div>
          {posts &&
            posts.map((post) => (
              <Posts
                key={post.docId}
                post={post}
                loggedUsername={username}
                loggedUserId={uid}
                following={following}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default TimeLine;
