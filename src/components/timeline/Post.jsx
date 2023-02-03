import React, { useEffect, useState } from "react";
import { AiOutlineComment, AiOutlineRetweet } from "react-icons/ai";
import { HiOutlineHeart } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";

import UserProfile from "./UserProfile";
import useUser from "../hooks/use-user";
import {
  updatePostUserLikesArray,
  updateRetweetsArray,
  postCount,
  retweetsInUsers,
} from "../../firebase/services";
import UserProfileHeader from "./UserProfileHeader";

import PostReplies from "../comments/PostReplies";
import { Link } from "react-router-dom";
import * as routes from "../../constants/route-paths";

function Post({
  fullname,
  username,
  post,
  imageSrc,
  caption,
  post_image,
  docId,
  postId,
  userId,
  allLikes,
  isRetweet,
  retweetUsername,
  retweetFullname,
}) {
  const { userDetails } = useUser();
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [overlay, setOverlay] = useState(false);
  const [comments, setComments] = useState(0);
  const [totalRetweets, setTotalRetweets] = useState(0);
  const [retweeted, setRetweeted] = useState(false);

  useEffect(() => {
    const getPostLikes = async function () {
      const res = await postCount(docId, userDetails?.uid, postId);
      setLiked(res.userLikes);
      setTotalLikes(res.likes);
      setComments(res.comments);
      setTotalRetweets(res.retweets);
      setRetweeted(res.isRetweeted);
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

  const retweetHandler = async function () {
    updateRetweetsArray(retweeted, docId, postId, userDetails?.uid);
    retweetsInUsers(retweeted, userDetails?.docId, postId);
    setRetweeted((rt) => !rt);
    setTotalRetweets((trt) => (!retweeted ? (trt += 1) : (trt -= 1)));
  };

  return (
    <div className="flex flex-col gap-3 py-4 text-sm border border-gray-100 justify-center px-5 hover:cursor-pointer hover:bg-gray-50">
      {isRetweet && (
        <div className="text-[13px] font-semibold text-gray-600">
          <Link
            to={`/${retweetUsername.trim()}`}
            className="font-semibold capitalize hover:border-b border-gray-400"
          >
            @{retweetUsername}
          </Link>
          Retweeted
        </div>
      )}

      <UserProfileHeader
        username={username}
        imageSrc={imageSrc}
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
        <div className="flex gap-2 text-gray-500 items-center">
          <FaRegComment
            onClick={userPostCommentHandler}
            className="w-4 h-4 text-gray-500 hover:cursor-pointer"
          />
          <p>{comments}</p>
        </div>
        <div className="flex gap-2 text-gray-500 hover:cursor-pointer items-center rounded-lg">
          <AiOutlineRetweet
            onClick={retweetHandler}
            className={`w-7 h-7  hover:cursor-pointer hover:bg-green-100 p-1 rounded-full ${
              retweeted ? "text-green-400" : "text-gray-500"
            }`}
          />
          <span className={`${retweeted ? "text-green-400" : "text-gray-500"}`}>
            {totalRetweets}
          </span>
        </div>
        <div className="flex gap-2 items-center text-gray-500">
          <HiOutlineHeart
            onClick={userPostLikeHandler}
            className={`w-7 h-7 p-1 hover:cursor-pointer rounded-full hover:bg-red-100 ${
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
          onAddComment={setComments}
        />
      )}
    </div>
  );
}

export default Post;
