import React from "react";
import { Link } from "react-router-dom";

function UserProfile({ imageSrc, fullname, username }) {
  return (
    <div className="flex gap-2 text-sm items-center">
      <img src={imageSrc} className="w-10 h-10 object-cover rounded-full" />
      <div>
        <Link
          to={`/${username.trim()}`}
          className="font-semibold capitalize text-sm hover:border-b border-gray-400"
        >
          {fullname}
        </Link>
        <p className="text-gray-500 text-xs">@{username}</p>
      </div>
    </div>
  );
}

export default UserProfile;
