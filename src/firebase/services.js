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
  return docs.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
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

export const postLikes = async function (docId, userId) {
  const docRef = doc(db, "posts", docId);
  const docSnap = await getDoc(docRef);
  const user = docSnap.data();

  return {
    likes: user.likes.length,
    userLikes: user.likes.includes(userId),
    comments: user.comments.length,
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

//userId in profile user following list ? unfollow : follow
// export const userIsFollowing = function (userId) {};
