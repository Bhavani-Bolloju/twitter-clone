import React from "react";
import { useOutletContext } from "react-router-dom";
import { useRetweets } from "../components/hooks/use-retweets";
import Post from "../components/timeline/Post";
import useUser from "../components/hooks/use-user";

function TweetsPage() {
  const [userPathId, profileUserId] = useOutletContext();
  const { userRetweets, userTweetsExist } = useRetweets(profileUserId);

  return (
    <div>
      {userTweetsExist && userRetweets.length > 0 ? (
        userRetweets.map((tweet, i) => (
          <Post
            key={tweet.docId + "_" + i}
            {...tweet}
            post_image={tweet.postImage}
          />
        ))
      ) : (
        <p className="text-center py-5 text-blue-500 text-sm">
          no posts retweeted
        </p>
      )}
    </div>
  );
}

export default TweetsPage;
