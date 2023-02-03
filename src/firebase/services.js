import { firebaseApp, db } from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
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
  const allPosts = docs.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
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
  console.log(isFollowing, profileuserDocId, userId, userDocId, profileUserId);
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
  // console.log(user.retweets, userId, user.retweets.includes(userId));

  return {
    likes: user?.likes.length,
    userLikes: user.likes.includes(userId),
    comments: user.comments.length,
    retweets: user.retweets?.length,
    isRetweeted: user.retweets.includes(userId),
  };
};

export const updatePostReplies = async function (spDocId, userName, reply) {
  const docRef = doc(db, "posts", spDocId);
  console.log(docRef);
  await updateDoc(docRef, {
    comments: arrayUnion({
      username: userName,
      comment: reply,
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
    docId: post.id,
  }));

  const postDetails = likedPosts.map(async (post) => {
    const user = await getUserByUserId(post.userId);
    return { ...user, ...post };
  });
  const data = await Promise.all(postDetails);

  return data;
};

//adding retweets to the retweets array in firebase

export const updateRetweetsArray = async function (
  tweeting,
  docId,
  postId,
  userId
) {
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

export const getRetweetedPosts = async function (followingArr) {
  const q = query(
    collection(db, "posts"),
    where("retweets", "array-contains-any", followingArr)
  );
  const doc = await getDocs(q);
  // console.log(doc);

  const data = doc.docs.map((post) => ({
    ...post.data(),
    docId: post.id,
    type: "retweet",
  }));
  return data;
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
    .map((doc) => ({ ...doc.data(), docId: doc.id }))
    .filter((doc) => following.includes(doc.uid));

  const userRetweets = data.flatMap(async (user) => {
    const retweets = user.retweets;

    if (retweets.length <= 0) return;

    const q = query(collection(db, "posts"), where("postId", "in", retweets));
    const getPosts = await getDocs(q);

    const postsData = getPosts.docs.map((post, i) => ({
      ...post.data(),
      docId: post.id,
      type: "retweet",
      tweetedUsername: user.username,
      tweetedFullname: user.fullname,
    }));
    return postsData;
  });

  const postData = await Promise.all(userRetweets);
  return postData;
};
