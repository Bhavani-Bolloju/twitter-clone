import React from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getUserLikedPosts } from "../firebase/services";
import Post from "../components/timeline/Post";
import { useState } from "react";

function LikesPage() {
  const [userPathId, profileUserId] = useOutletContext();
  const [likedPosts, setLikedPosts] = useState(null);

  useEffect(() => {
    const userLikedPosts = async function () {
      const res = await getUserLikedPosts(profileUserId);
      setLikedPosts(res);
    };
    userLikedPosts();
  }, []);

  return (
    <div>
      {likedPosts &&
        likedPosts.map((post) => (
          <Post
            fullname={post.fullname}
            username={post.username}
            post={post.post}
            imageSrc={post.imageSrc}
            caption={post.caption}
            post_image={post.postImage}
            docId={post.docId}
            userId={post.userId}
            allLikes={post.likes}
          />
        ))}
    </div>
  );
}

export default LikesPage;
