import { firebaseApp, db } from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDocs, query, where, collection } from "firebase/firestore";

export const getUserByUserId = async function (userId) {
  const q = query(collection(db, "users"), where("uid", "==", userId));
  const doc = await getDocs(q);
  const userData = doc.docs[0].data();
  return userData;
};

export const getPosts = async function (following) {
  const q = query(collection(db, "posts"), where("userId", "in", following));
  const docs = await getDocs(q);
  return docs.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
};
