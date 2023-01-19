// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBgI-utTJ7zKQhLTOG4HU3s03jbHd-Q4Xk",
  authDomain: "twitter-clone-6f949.firebaseapp.com",
  databaseURL: "https://twitter-clone-6f949-default-rtdb.firebaseio.com",
  projectId: "twitter-clone-6f949",
  storageBucket: "twitter-clone-6f949.appspot.com",
  messagingSenderId: "773291792008",
  appId: "1:773291792008:web:3bc948db2b71945597313d",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
