import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getUserRepliedPosts } from "../firebase/services";
import Comment from "../components/comments/Comment";

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

  return (
    <div>
      {replies && replies.length > 0 ? (
        replies.map((post, i) => (
          <Comment
            key={post.docId + "_" + i}
            imageSrc={post.imageSrc}
            username={post.username}
            fullname={post.fullname}
            replyingTo={post.replyingTo}
            comment={post.comment}
          />
        ))
      ) : (
        <p className="text-sm text-blue-700 flex-1 text-center">no replies</p>
      )}
    </div>
  );
}

export default TweetsAndReplies;
