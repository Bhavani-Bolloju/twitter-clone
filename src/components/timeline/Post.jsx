import React, { useEffect, useState, useRef } from "react";
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
  bookMarkPost,
} from "../../firebase/services";
import UserProfileHeader from "./UserProfileHeader";

import PostReplies from "../comments/PostReplies";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../constants/route-paths";
import { FaRetweet } from "react-icons/fa";

function Post({
  fullname,
  username,
  imageSrc,
  docId,
  caption,
  post_image,
  userId,
  postDocId,
  allLikes,
  postId,
  isRetweet,
  retweetUsername,
}) {
  const { userDetails } = useUser();
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [overlay, setOverlay] = useState(false);
  const [comments, setComments] = useState(0);
  const [totalRetweets, setTotalRetweets] = useState(0);
  const [retweeted, setRetweeted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getPostLikes = async function () {
      const res = await postCount(postDocId, userDetails?.uid, postId);
      setLiked(res.userLikes);
      setTotalLikes(res.likes);
      setComments(res.comments);
      setTotalRetweets(res.retweets);
      setRetweeted(res.isRetweeted);
      setIsBookmarked(res.isBookmarked);
    };

    if (userDetails) {
      getPostLikes();
    }
  }, [userDetails?.uid]);

  const userPostLikeHandler = function (e) {
    e.stopPropagation();
    updatePostUserLikesArray(liked, postDocId, userDetails.uid);
    setLiked((prev) => !prev);

    setTotalLikes((count) => {
      return !liked ? (count += 1) : (count -= 1);
    });
  };
  const userPostCommentHandler = function (e) {
    e.stopPropagation();
    setOverlay(true);
  };

  const retweetHandler = async function (e) {
    e.stopPropagation();
    updateRetweetsArray(retweeted, postDocId, userDetails?.uid);
    retweetsInUsers(retweeted, userDetails?.docId, postId);
    setRetweeted((rt) => !rt);
    setTotalRetweets((trt) => (!retweeted ? (trt += 1) : (trt -= 1)));
  };

  const bookmarkHandler = function (e) {
    // e.stopPropagation();
    setIsBookmarked((prev) => !prev);
    // console.log(isBookmarked, postDocId, userDetails?.uid);
    bookMarkPost(isBookmarked, postDocId, userDetails?.uid);
  };

  const navigateUser = function (e) {
    // if (e.currentTarget !== e.target) return;
    navigate(`/postPage/${postId}`);
  };

  return (
    <div
      onClick={navigateUser}
      className="flex flex-col gap-3 py-4 text-sm border border-gray-100 justify-center px-5 hover:bg-gray-50"
    >
      {isRetweet && (
        <div className="text-[13px] font-semibold text-gray-600 flex gap-1">
          <Link
            to={`/${retweetUsername}`}
            className="font-semibold capitalize hover:border-b border-gray-400 flex items-center gap-1"
          >
            <FaRetweet />{" "}
            {userDetails?.username === `${retweetUsername}`
              ? " you "
              : ` ${retweetUsername}`}
          </Link>
          <span> Retweeted</span>
        </div>
      )}

      <UserProfileHeader
        userId={userId}
        loggedUserId={userDetails?.uid}
        following={userDetails?.following}
        username={username}
        imageSrc={imageSrc}
        fullname={fullname}
        bookmark={isBookmarked}
        onBookmark={bookmarkHandler}
        loggedUserDocId={userDetails?.docId}
      />
      <main className="col-span-1 row-span-3 ml-[50px] ">
        <p className="text-gray-600">{caption}</p>
        {post_image && (
          <img
            src={post_image}
            alt={username}
            className="mt-3 w-[100%] h-[300px] rounded-2xl object-cover"
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
          docId={docId}
          onClose={setOverlay}
          postImage={post_image}
          caption={caption}
          spFullname={fullname}
          spUsername={username}
          spUserId={userId}
          postId={postId}
          spDocId={postDocId}
          imageSrc={userDetails?.imageSrc}
          loggedUserId={userDetails?.uid}
          loggedUserName={userDetails?.username}
          loggedUserFullName={userDetails?.fullname}
          loggedUserDocId={userDetails?.docId}
          onAddComment={setComments}
        />
      )}
    </div>
  );
}

export default Post;
