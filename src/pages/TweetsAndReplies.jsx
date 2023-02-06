import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getUserRepliedPosts } from "../firebase/services";
import { RxDotsHorizontal } from "react-icons/rx";

function TweetsAndReplies() {
  const [username, profileUserId] = useOutletContext();
  const [replies, setReplies] = useState();

  useEffect(() => {
    const getUserPosts = async function () {
      const res = await getUserRepliedPosts(profileUserId, username);
      setReplies(res);
    };

    if (profileUserId) {
      getUserPosts();
    }
  }, [profileUserId]);

  const removeReplyHandler = function () {};

  return (
    <div>
      {replies && replies.length > 0 ? (
        replies.map((post, i) => (
          <div
            key={post.docId + "_" + i}
            className="border border-gray-200 p-3 hover:bg-gray-50 flex flex-wrap"
          >
            <div className="flex text-[16px] items-center gap-2">
              <img
                src={post.imageSrc}
                alt={post.username}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <div className="flex gap-1 capitalize">
                  <Link
                    to={`/${post.username.trim()}`}
                    className="hover:border-b border-gray-400 font-semibold"
                  >
                    {post.fullname}
                  </Link>
                  <span className="text-gray-600">@{post.username}</span>
                </div>
                <p className="text-gray-600">
                  replying to{" "}
                  <Link
                    to={`/${post.replyingTo.trim()}`}
                    className="text-blue-800 hover:border-b border-gray-400"
                  >
                    @{post.replyingTo}
                  </Link>
                </p>
              </div>
            </div>
            <RxDotsHorizontal
              className="ml-auto flex-0 hover:cursor-pointer"
              onClick={removeReplyHandler}
            />
            <div className="ml-14 mt-1 text-gray-600 flex-1 basis-[100%]">
              {post.comment}
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-blue-700 flex-1 text-center">no replies</p>
      )}
    </div>
  );
}

export default TweetsAndReplies;
