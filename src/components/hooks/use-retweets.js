import useUser from "./use-user";
import {
  getRetweetedPosts,
  getTweetedPostsFromUser,
  getUserByUserId,
} from "../../firebase/services";
import { useEffect, useState } from "react";

export const useRetweets = function () {
  const { userDetails } = useUser();
  const [retweets, setRetweets] = useState();

  useEffect(() => {
    const getRetweets = async function () {
      const res = await getTweetedPostsFromUser(
        userDetails?.uid,
        userDetails.following
      );

      const data =
        res &&
        res
          .flatMap((post) => post)
          .map(async (post) => {
            const user = await getUserByUserId(post.userId);
            return { ...user, ...post };
          });
      const post = await Promise.all(data);

      setRetweets(post);
    };

    if (userDetails?.following) {
      getRetweets();
    }
  }, []);

  return { retweets };
};
