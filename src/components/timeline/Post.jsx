import React, { useEffect, useState } from "react";
import { AiOutlineComment, AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineHeart } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";

import UserProfile from "./UserProfile";
import useUser from "../hooks/use-user";
import { updatePostUserLikesArray } from "../../firebase/services";
import { postLikes } from "../../firebase/services";
import PostReplies from "../comments/PostReplies";

function Post({
  fullname,
  username,
  post,
  imageSrc,
  caption,
  post_image,
  docId,
  userId,
  allLikes,
}) {
  const { userDetails } = useUser();

  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const getPostLikes = async function () {
      const res = await postLikes(docId, userDetails?.uid);
      setLiked(res.userLikes);
      setTotalLikes(res.likes);
    };

    if (userDetails) {
      getPostLikes();
    }
  }, [userDetails?.uid]);

  const userPostLikeHandler = function () {
    updatePostUserLikesArray(liked, docId, userDetails.uid);
    setLiked((prev) => !prev);

    setTotalLikes((count) => {
      return !liked ? (count += 1) : (count -= 1);
    });
  };
  const userPostCommentHandler = function () {
    setOverlay(true);
  };
  // const userPostRetweetHandler = function () {
  //   console.log("retweet");
  // };

  return (
    <div className="flex flex-col gap-3 py-4 text-sm border border-gray-100 justify-center px-5">
      <UserProfile
        imageSrc={imageSrc}
        username={username}
        fullname={fullname}
      />
      <main className="col-span-1 row-span-3 ml-[50px] ">
        <p>{caption}</p>
        {post_image && (
          <img
            src={post_image}
            alt={username}
            className="mt-3 w-[100%] h-[280px] rounded-2xl object-cover"
          />
        )}
      </main>
      <footer className="ml-[60px] flex gap-20 self-start items-center">
        <FaRegComment
          onClick={userPostCommentHandler}
          className="w-4 h-4 text-gray-500 hover:cursor-pointer"
        />
        <AiOutlineRetweet
          // onClick={userPostRetweetHandler}
          className="w-5 h-5 text-gray-500 hover:cursor-pointer"
        />
        <div className="flex gap-2 text-gray-500">
          <HiOutlineHeart
            onClick={userPostLikeHandler}
            className={`w-5 h-5 hover:cursor-pointer  ${
              liked ? "text-red-500 fill-red-500" : "text-gray-500"
            }`}
          />
          <span className={`${liked ? "text-red-500" : "text-gray-500"}`}>
            {allLikes && totalLikes}
          </span>
        </div>
      </footer>
      {overlay && (
        <PostReplies
          onClose={setOverlay}
          postImage={post_image}
          caption={caption}
          spFullname={fullname}
          spUsername={username}
          spUserId={userId}
          spDocId={docId}
          imageSrc={userDetails?.imageSrc}
          loggedUserId={userDetails?.uid}
          loggedUserName={userDetails?.username}
          loggedUserFullName={userDetails?.fullname}
        />
      )}
    </div>
  );
}

export default Post;
