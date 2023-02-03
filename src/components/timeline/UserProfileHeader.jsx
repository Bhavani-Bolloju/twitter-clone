import React, { useState, useRef, useEffect } from "react";
import UserProfile from "./UserProfile";
import { RxDotsHorizontal, RxBookmark } from "react-icons/rx";
import { RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri";

function UserProfileHeader({ imageSrc, username, fullname }) {
  const [openbox, setOpenbox] = useState(false);
  const ref = useRef();

  const postOptionsHandler = function () {
    setOpenbox((prev) => !prev);
  };
  const handleClickOutside = function (e) {
    if (!ref.current.contains(e.target)) {
      setOpenbox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <p className="flex items-center gap-1 hover:text-blue-500">
              <RiUserFollowLine />
              <span>unfollow @{username}</span>
            </p>

            <p className="flex items-center gap-1 hover:text-blue-500">
              <RxBookmark />
              <span>bookMark</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfileHeader;
