import { useEffect, useState } from "react";
import { getPosts, getUserByUserId } from "../../firebase/services";

const usePosts = function (following, uid) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userPost = async function () {
      const res = await getPosts(following, uid);
      const postDetails = res.map(async (post) => {
        const user = await getUserByUserId(post.userId);
        return { ...user, ...post };
      });
      const data = await Promise.all(postDetails);
      setPosts(data);
    };

    userPost();
  }, []);

  return { posts };
};

export default usePosts;
