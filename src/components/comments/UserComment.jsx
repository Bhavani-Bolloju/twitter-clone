import React, { useState } from "react";
import { getUserByUsername } from "../../firebase/services";
import Comment from "./Comment";

function UserComment({ comments, postUsername }) {
  const [replies, setReplies] = useState([]);
  // console.log(comments, postUsername);

  useState(() => {
    const getComments = async function () {
      const list = comments.map(async (comment) => {
        const user = await getUserByUsername(comment.username);
        const data = {
          username: user.username,
          fullname: user.fullname,
          comment: comment.comment,
          imageSrc: user.imageSrc,
          docId: user.docId,
          replyingTo: postUsername,
        };

        return data;
      });
      const res = await Promise.all(list);
      setReplies(res);
    };

    if (comments.length > 0) {
      getComments();
    }
  }, [comments]);

  return (
    <div>
      {replies.length > 0 &&
        replies.map((reply, i) => (
          <Comment key={reply.docId + "_" + i} {...reply} />
        ))}
    </div>
  );
}

export default UserComment;

// const data = {
//   username: user.username,
//   fullname: user.fullname,
//   comment: comment.comment,
//   imageScr: user.imageScr,
//   replyingTo: postUsername,
// };
