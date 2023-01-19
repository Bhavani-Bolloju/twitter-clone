import { async } from "@firebase/util";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getUserByUserId } from "../../firebase/services";

const useUser = function () {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getuserDetails = async function (userId) {
      const res = await getUserByUserId(userId);
      setUserDetails(res);
    };
    if (user) {
      getuserDetails(user.uid);
    }
  }, []);

  return { userDetails };
};
export default useUser;
