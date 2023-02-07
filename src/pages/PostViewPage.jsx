import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserPostByPostId, getUserByUserId } from "../firebase/services";
import { BsArrowLeft } from "react-icons/bs";
import Post from "../components/timeline/Post";
import UserComment from "../components/comments/UserComment";
import * as routes from "../constants/route-paths";

function PostViewPage() {
  const [post, setPost] = useState();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const getUserPost = async function () {
      const res = await getUserPostByPostId(id);
      const userData = await getUserByUserId(res.userId);

      setPost({ ...res, postComments: res.comments, ...userData });
    };
    if (id) {
      getUserPost();
    }
  }, [id]);
  // console.log(post);

  return (
    <div className="relative">
      <header className="realtive h-12 w-full">
        <div className=" h-12 w-[580px]">
          <span className="z-50 fixed top-0 bg-white/80 pt-1  h-12 min-w-[580px] font-semibold text-lg flex items-center gap-5">
            <Link to={`${routes.home}`}>
              {" "}
              <BsArrowLeft />
            </Link>{" "}
            Tweet
          </span>
        </div>
      </header>
      <main className="h-[100vh] pt-4">
        {post && (
          <Post
            fullname={post.fullname}
            username={post.username}
            imageSrc={post.imageSrc}
            caption={post.caption}
            post_image={post.postImage}
            userId={post.userId}
            postDocId={post.postDocId}
            docId={post.docId}
            // loggedUserDocId={loggedUserDocId}
            allLikes={post.likes}
            postId={post.postId}
            isRetweet={post.type === "retweet" ? true : false}
            retweetUsername={post.tweetedUsername || ""}
            retweetFullname={post.tweetedFullname || ""}
            // following={following}
          />
        )}
        <div className="h-[100vh]">
          {post && (
            <UserComment
              comments={post.postComments}
              postUsername={post.username}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default PostViewPage;
