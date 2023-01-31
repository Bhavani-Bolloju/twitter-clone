import React, { useContext, useState } from "react";
import UserProfile from "../timeline/UserProfile";

import { toggleFollower } from "../../firebase/services";

function SuggestedProfile({
  spUsername,
  spFullname,
  userId,
  spDocId,
  spUserId,
  imageSrc,
  userDocId,
}) {
  const [toFollow, setToFollow] = useState(false);

  const followUserHandler = function () {
    toggleFollower(toFollow, spDocId, userId, userDocId, spUserId);
    setToFollow((prev) => !prev);
  };

  return (
    <div className="flex justify-between gap-8 items-center bg-gray-50">
      <UserProfile
        imageSrc={imageSrc}
        username={spUsername}
        fullname={spFullname}
      />
      <button
        onClick={followUserHandler}
        className="bg-gray-900 text-xs text-gray-100 font-semibold px-4 py-[5px] rounded-full hover:bg-gray-700"
      >
        {!toFollow ? "follow" : "unfollow"}
      </button>
    </div>
  );
}

export default SuggestedProfile;
