import React from "react";
import { Link } from "react-router-dom";

function Comment({ imageSrc, username, fullname, replyingTo, comment }) {
  return (
    <div className="border text-[14px]  border-gray-200 p-3 hover:bg-gray-50 flex flex-wrap relative">
      <div className="flex items-center gap-2 ">
        <img
          src={imageSrc}
          alt={username}
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <div className="flex gap-1 capitalize">
            <Link
              to={`/${username.trim()}`}
              className="hover:border-b border-gray-400 font-semibold"
            >
              {fullname}
            </Link>
            <span className="text-gray-600">@{username}</span>
          </div>
          <p className="text-gray-600">
            replying to{" "}
            <Link
              to={`/${replyingTo.trim()}`}
              className="text-blue-800 hover:border-b border-gray-400"
            >
              @{replyingTo}
            </Link>
          </p>
        </div>
      </div>

      <div className="ml-14 mt-1 text-gray-600 flex-1 basis-[100%]">
        {comment}
      </div>
    </div>
  );
}

export default Comment;
