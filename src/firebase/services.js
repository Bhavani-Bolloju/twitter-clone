import { firebaseApp, db } from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ref } from "firebase/storage";
import {
  getDocs,
  query,
  where,
  collection,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  FieldPath,
} from "firebase/firestore";
import { async } from "@firebase/util";

export const getUserByUserId = async function (userId) {
  const q = query(collection(db, "users"), where("uid", "==", userId));
  const doc = await getDocs(q);
  const userData = { ...doc.docs[0].data() };

  return { ...userData, docId: doc.docs[0].id };
};

export const getPosts = async function (following, uid) {
  const q = query(
    collection(db, "posts"),
    where("userId", "in", [...following, uid])
  );

  const docs = await getDocs(q);
  const allPosts = docs.docs.map((doc) => ({
    ...doc.data(),
    postDocId: doc.id,
  }));
  // console.log(allPosts);

  return allPosts;
};

export const getSuggestedProfiles = async function (userid, following) {
  const q = query(collection(db, "users"));
  const profiles = await getDocs(q);
  const data = profiles.docs
    .map((doc) => ({ ...doc.data(), docId: doc.id }))
    .filter((doc) => doc.uid !== userid && !following.includes(doc.uid));
  // console.log(data);
  return data;
};

export const updateLoggedUserFollowingArray = async function (
  isFollowing,
  userDocId,
  profileUserId
) {
  const data = doc(db, "users", userDocId);

  await updateDoc(
    data,
    isFollowing
      ? { following: arrayRemove(profileUserId) }
      : {
          following: arrayUnion(profileUserId),
        }
  );
};

export const updateProfileUserFollowersArray = async function (
  isFollowing,
  profileuserDocId,
  userId
) {
  const data = doc(db, "users", profileuserDocId);

  await updateDoc(
    data,
    isFollowing
      ? { followers: arrayRemove(userId) }
      : {
          followers: arrayUnion(userId),
        }
  );
};

export const toggleFollower = async function (
  isFollowing,
  profileuserDocId,
  userId,
  userDocId,
  profileUserId
) {
  // console.log(isFollowing, profileuserDocId, userId, userDocId, profileUserId);
  await updateLoggedUserFollowingArray(isFollowing, userDocId, profileUserId);
  await updateProfileUserFollowersArray(isFollowing, profileuserDocId, userId);
};

export const updatePostUserLikesArray = async function (
  isLiked,
  postUserDocId,
  loggeduserId
) {
  const data = doc(db, "posts", postUserDocId);
  await updateDoc(
    data,
    isLiked
      ? {
          likes: arrayRemove(loggeduserId),
        }
      : {
          likes: arrayUnion(loggeduserId),
        }
  );
};

export const postCount = async function (docId, userId, postId) {
  const docRef = doc(db, "posts", docId);
  const docSnap = await getDoc(docRef);
  const user = docSnap.data();

  return {
    likes: user?.likes.length,
    userLikes: user.likes.includes(userId),
    comments: user.comments.length,
    retweets: user.retweets?.length,
    isRetweeted: user.retweets.includes(userId),
    isBookmarked: user.bookmark.includes(userId),
  };
};

export const updatePostReplies = async function (spDocId, userName, reply, id) {
  const docRef = doc(db, "posts", spDocId);

  await updateDoc(docRef, {
    comments: arrayUnion({
      username: userName,
      comment: reply,
      id: id,
    }),
  });
};

export const updateUserReplies = async function (
  docId,
  comment,
  postId,
  replyingTo,
  id
) {
  const docRef = doc(db, "users", docId);
  console.log(docRef, "user replies doc");

  await updateDoc(docRef, {
    comments: arrayUnion({
      comment,
      postId,
      replyingTo,
      id,
    }),
  });
};

export const getUserByUsername = async function (user) {
  const qUser = query(collection(db, "users"), where("username", "==", user));
  const docUser = await getDocs(qUser);
  const userData = docUser?.docs[0]?.data();
  return { ...userData, docId: docUser?.docs[0].id };
};

export const getUserLikedPosts = async function (userId) {
  const q = query(
    collection(db, "posts"),
    where("likes", "array-contains", userId)
  );
  const doc = await getDocs(q);

  const likedPosts = doc.docs.map((post) => ({
    ...post.data(),
    postDocId: post.id,
  }));

  const postDetails = likedPosts.map(async (post) => {
    const user = await getUserByUserId(post.userId);
    return { ...user, ...post };
  });
  const data = await Promise.all(postDetails);
  // console.log(data);

  return data;
};

export const updateRetweetsArray = async function (tweeting, docId, userId) {
  const docRef = doc(db, "posts", docId);

  await updateDoc(
    docRef,
    !tweeting
      ? {
          retweets: arrayUnion(userId),
        }
      : {
          retweets: arrayRemove(userId),
        }
  );
};

export const getRetweetedPosts = async function (tweetsArray) {
  const q = query(collection(db, "posts"), where("postId", "in", tweetsArray));
  const getPosts = await getDocs(q);

  const postsData = getPosts.docs.map((post, i) => {
    return {
      ...post.data(),
      postDocId: post.id,
      type: "retweet",
    };
  });
  return postsData;
};

export const retweetsInUsers = async function (tweeting, userDocId, postId) {
  const docRef = doc(db, "users", userDocId);

  await updateDoc(
    docRef,
    !tweeting
      ? {
          retweets: arrayUnion(postId),
        }
      : {
          retweets: arrayRemove(postId),
        }
  );
};

export const getTweetedPostsFromUser = async function (userId, following) {
  const q = query(collection(db, "users"));

  const profiles = await getDocs(q);

  const data = profiles.docs
    .map((doc) => ({ ...doc.data(), postDocId: doc.id }))
    .filter((doc) => following.includes(doc.uid));

  const userRetweets = data.flatMap(async (user) => {
    const retweets = user.retweets;

    if (retweets.length <= 0) return;

    const q = query(collection(db, "posts"), where("postId", "in", retweets));
    const getPosts = await getDocs(q);

    const postsData = getPosts.docs.map((post, i) => {
      // console.log(post.data(), "post");
      return {
        ...post.data(),
        postDocId: post.id,
        type: "retweet",
        tweetedUsername: user.username,
        tweetedFullname: user.fullname,
      };
    });
    return postsData;
  });

  const postData = await Promise.all(userRetweets);
  const validPostData = postData.filter((post) => post);

  return validPostData;
};

//toggle post bookmark
export const bookMarkPost = async function (isBookmarked, docId, loggedUserId) {
  const docRef = doc(db, "posts", docId);

  await updateDoc(
    docRef,
    !isBookmarked
      ? {
          bookmark: arrayUnion(loggedUserId),
        }
      : {
          bookmark: arrayRemove(loggedUserId),
        }
  );
};

//get all posts logged user bookmarked

export const getBookmarkedPosts = async function (userId) {
  const q = query(
    collection(db, "posts"),
    where("bookmark", "array-contains", userId)
  );

  const docs = await getDocs(q);
  const bookmarkedPosts = docs.docs.map((doc) => ({
    ...doc.data(),
    postDocId: doc.id,
  }));

  const postDetails = bookmarkedPosts.map(async (post) => {
    const user = await getUserByUserId(post.userId);
    return {
      ...post,
      ...user,
    };
  });
  const data = await Promise.all(postDetails);

  return data;
};

export const getUserRepliedPosts = async function (userId, repliedTo) {
  const user = await getUserByUserId(userId);
  console.log(user);
  const userComments = user.comments;
  const data = userComments.map((reply) => ({
    ...reply,
    repliedTo,
    ...user,
  }));
  return data;
};

export const getUserPostByPostId = async function (postId) {
  const q = query(collection(db, "posts"), where("postId", "==", postId));
  const docs = await getDocs(q);
  const doc = docs.docs;
  // console.log(doc[0].data());
  // console.log(doc[0].data());
  return { ...doc[0].data(), postDocId: doc[0].id };
};
