import React, { useState } from "react";
import { useEffect } from "react";
import useUser from "../hooks/use-user";
import { toggleFollower } from "../../firebase/services";

function ProfileHeader({
  username,
  fullname,
  userId,
  profileUserId,
  imageSrc,
  following,
  followers,
  userDocId,
  profileUserDocId,
}) {
  const { userDetails } = useUser();
  const [userFollowing, setUserFollowing] = useState();

  useEffect(() => {
    const isUserFollowing = followers.includes(userDetails?.uid);
    setUserFollowing(isUserFollowing);
  }, [userDetails?.uid]);

  const followHandler = function () {
    //   isFollowing,
    // profileuserDocId,
    // userId,
    // userDocId,
    // profileUserId
    toggleFollower(
      userFollowing,
      profileUserDocId,
      userId,
      userDocId,
      profileUserId
    );

    setUserFollowing((suf) => !suf);
  };

  return (
    <div className="flex flex-col ">
      <header className="h-12 ">
        <div className="bg-white/60 h-12 w-[600px] z-10 p-3 fixed">
          {username}
        </div>
      </header>
      <div className="self-stretch h-[100vh]">
        <div className="relative h-44 bg-slate-200">
          <div className="absolute -bottom-10 left-4 rounded-full h-32 w-32 bg-blue-800 flex border-4 border-white items-center justify-center text-white">
            {imageSrc ? (
              <img
                src={imageSrc}
                className="rounded-full w-full h-full object-cover"
                alt={username}
              />
            ) : (
              <div className="rounded-full">{fullname[0].toUpperCase()}</div>
            )}
          </div>
        </div>
        <div className="py-5 px-6 border-b border-gray-200">
          <div className="flex justify-end">
            {profileUserId !== userId && (
              <button
                onClick={followHandler}
                className="bg-gray-900 text-gray-100 px-3 rounded-full text-sm font-semibold py-1"
              >
                {userFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div>
              <p className="text-lg capitalize font-bold text-gray-800 -mb-1">
                {fullname}
              </p>
              <p className="text-sm text-gray-600">@{username}</p>
            </div>
            <div className="flex text-sm gap-4 text-gray-600">
              <div>
                <span className="font-bold mr-1 text-gray-800">
                  {following.length}
                </span>
                Following
              </div>
              <div>
                <span className="font-bold text-gray-800">
                  {followers.length}
                </span>
                {followers.length <= 1 ? " Follower" : " Followers"}
              </div>
            </div>
          </div>
        </div>
        <main>main content</main>
      </div>
    </div>
  );
}

export default ProfileHeader;
