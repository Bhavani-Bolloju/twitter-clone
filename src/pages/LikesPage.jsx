import React from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getUserLikedPosts } from "../firebase/services";
import Post from "../components/timeline/Post";
import { useState } from "react";

function LikesPage() {
  const [userPathId, profileUserId] = useOutletContext();
  const [likedPosts, setLikedPosts] = useState(null);
  // console.log(userPathId, profileUserId);

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
        likedPosts.map((post, i) => (
          <Post
            key={post + "_" + i}
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
            isRetweet={post.isRetweet}
            retweetUsername={post.retweetUsername}
            retweetFullname={post.retweetFullname}
          />
        ))}
    </div>
  );
}

export default LikesPage;

//   fullname,
//   username,
//   imageSrc,
//   caption,
//   post_image,
//   userId,
//   postDocId,
//   docId,
//   allLikes,
//   postId,
//   isRetweet,
//   retweetUsername,
//   retweetFullname,
//   following,
