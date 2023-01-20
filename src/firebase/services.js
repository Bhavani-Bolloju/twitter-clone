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

export const getPosts = async function (following) {
  const q = query(collection(db, "posts"), where("userId", "in", following));
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
