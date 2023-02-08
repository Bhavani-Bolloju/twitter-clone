import React, { useState } from "react";
import { useEffect } from "react";
import useUser from "../components/hooks/use-user";
import Post from "../components/timeline/Post";
import { getBookmarkedPosts } from "../firebase/services";

function BookMarksPage() {
  const { userDetails } = useUser();
  const [bookmarkedPosts, setBookMarkedPosts] = useState([]);

  useEffect(() => {
    const getPosts = async function () {
      const res = await getBookmarkedPosts(userDetails?.uid);
      setBookMarkedPosts(res);
    };

    if (userDetails?.uid) {
      getPosts();
    }
  }, [userDetails?.uid]);

  return (
    <div className="col-span-1 ">
      <div className=" h-16 -mb-1">
        <header className="p-3 bg-white/80 w-[600px] h-16 fixed font-bold text-gray-800 text-lg z-10">
          Bookmarks
          <p className="text-xs font-thin">@{userDetails?.username}</p>
        </header>
      </div>
      <div className="h-[100vh]">
        {bookmarkedPosts &&
          bookmarkedPosts.map((post, i) => {
            return (
              <Post
                key={post.docID + "_" + i}
                fullname={post.fullname}
                username={post.username}
                imageSrc={post.imageSrc}
                caption={post.caption}
                post_image={post.postImage}
                userId={post.userId}
                postDocId={post.postDocId}
                docId={post.docId}
                allLikes={post.allLikes}
                postId={post.postId}
                isRetweet={post.isRetweet}
                retweetUsername={post.retweetUsername}
                retweetFullname={post.retweetFullname}
                following={post.following}
              />
            );
          })}
      </div>
    </div>
  );
}

export default BookMarksPage;

// border bg-white border-gray-200 p-4 w-[300px] h-full
// class="relative gap-4 w-full h-full
