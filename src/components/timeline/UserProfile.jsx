import React from "react";
import { Link, useNavigate } from "react-router-dom";

function UserProfile({ imageSrc, fullname, username }) {
  const navigate = useNavigate();
  const navUserHandler = function (e) {
    e.stopPropagation();
    navigate(`/${username.trim()}`);
  };

  return (
    <div className="flex gap-2 text-sm items-center">
      <img src={imageSrc} className="w-10 h-10 object-cover rounded-full" />
      <div>
        <div
          onClick={navUserHandler}
          className="font-[500] capitalize text-sm hover:border-b border-gray-400 hover:cursor-pointer"
        >
          {fullname}
        </div>
        <p className="text-gray-400 text-xs">@{username}</p>
      </div>
    </div>
  );
}

export default UserProfile;
