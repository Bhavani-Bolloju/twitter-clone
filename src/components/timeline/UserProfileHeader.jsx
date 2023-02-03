import React, { useState, useRef, useEffect } from "react";
import UserProfile from "./UserProfile";
import { RxDotsHorizontal } from "react-icons/rx";
import { BiBookmarks } from "react-icons/bi";
import { RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri";
import { toggleFollower, bookMarkPost } from "../../firebase/services";

function UserProfileHeader({
  imageSrc,
  username,
  fullname,
  following,
  userId,
  loggedUserId,
  spDocId,
  loggedUserDocId,
  onBookmark,
  bookmark,
}) {
  const [isFollowing, setIsfollowing] = useState(null);
  const [openbox, setOpenbox] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const ref = useRef();

  const postOptionsHandler = function () {
    setOpenbox((prev) => !prev);
  };

  // const handleClickOutside = function (e) {
  //   if (!ref.current.contains(e.target)) {
  //     setOpenbox(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  useEffect(() => {
    if (following && userId) {
      setIsfollowing(following.includes(userId));
    }
  }, [following, userId]);

  const toggleFollowerHandler = function () {
    setIsfollowing((prev) => !prev);
    toggleFollower(isFollowing, spDocId, loggedUserId, loggedUserDocId, userId);
  };

  return (
    <>
      <div className="flex justify-between relative items-center">
        <UserProfile
          imageSrc={imageSrc}
          username={username}
          fullname={fullname}
        />
        <div
          className="hover:bg-blue-100 p-1 rounded-full text-2xl"
          onClick={postOptionsHandler}
          ref={ref}
        >
          <RxDotsHorizontal />
        </div>
        {openbox && (
          <div className="absolute right-3 text-xs font-semibold flex flex-col gap-2   w-[250px] top-6 bg-white shadow-lg p-3 rounded-lg">
            {loggedUserId !== userId && (
              <button
                onClick={toggleFollowerHandler}
                className="flex items-center gap-1 hover:text-blue-500"
              >
                {isFollowing ? (
                  <>
                    <RiUserUnfollowLine />
                    <span>unfollow</span>
                  </>
                ) : (
                  <>
                    <RiUserFollowLine />
                    <span>follow</span>
                  </>
                )}
                @{username}
              </button>
            )}

            <button
              onClick={onBookmark}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              <BiBookmarks />
              <span>{bookmark ? "Remove" : "Add"} bookMark</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfileHeader;
