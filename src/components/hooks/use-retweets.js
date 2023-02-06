import useUser from "./use-user";
import { getRetweetedPosts, getUserByUserId } from "../../firebase/services";
import { useEffect, useState } from "react";

export const useRetweets = function (userId) {
  const [userRetweets, setUserRetweets] = useState(null);

  const [userTweetsExist, setUserTweetsExist] = useState(false);

  useEffect(() => {
    const getRetweets = async function () {
      const user = await getUserByUserId(userId);

      if (user.retweets.length <= 0) {
        setUserTweetsExist(false);
        return;
      }

      const res = await getRetweetedPosts(user?.retweets);
      const postUser = res.map(async (post) => {
        const data = await getUserByUserId(post.userId);
        return {
          ...data,
          ...post,
          retweetUsername: user.username,
          tweetedUserId: user.uid,
          isRetweet: true,
        };
      });

      const userPosts = await Promise.all(postUser);
      setUserTweetsExist(true);
      setUserRetweets(userPosts);
    };

    if (userId) {
      getRetweets();
    }
  }, [userId]);

  return { userRetweets, userTweetsExist };
};
