import { firebaseApp } from "../../firebase/firebase";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuth = function () {
  const storedAuthUser = JSON.parse(localStorage.getItem("authUser"));

  const [user, setUser] = useState(storedAuthUser);

  const auth = getAuth();
  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      //user signed in
      localStorage.setItem("authUser", JSON.stringify(authUser));
      setUser(authUser);
    } else {
      //user signed out
      localStorage.removeItem("authUser");
      setUser(null);
    }
  });

  return { user };
};

export default useAuth;
