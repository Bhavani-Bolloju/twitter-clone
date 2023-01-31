import useUser from "./use-user";
import {
  getRetweetedPosts,
  getTweetedPostsFromUser,
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

      const data = res.flatMap((post) => post);
      setRetweets(data);
    };

    if (userDetails?.following) {
      getRetweets();
    }
  }, []);

  return { retweets };
};
