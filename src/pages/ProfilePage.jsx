import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUser from "../components/hooks/use-user";
import { getUserByUsername } from "../firebase/services";
import ProfileHeader from "../components/profile/ProfileHeader";

function ProfilePage() {
  const { userDetails } = useUser();
  const [user, setUser] = useState(null);

  const params = useParams();
  const userName = params.id;

  useEffect(() => {
    const getUserData = async function () {
      const data = await getUserByUsername(userName);
      setUser(data);
    };
    if (userDetails) {
      getUserData();
    }
  }, [userName, userDetails]);

  return (
    <div className="bg-white border w-[100%]  border-gray-200">
      {user && (
        <ProfileHeader
          username={user.username}
          imageSrc={user?.imageSrc ? user?.imageSrc : ""}
          fullname={user.fullname}
          followers={user.followers}
          following={user.following}
          userId={userDetails?.uid}
          profileUserId={user.uid}
          userDocId={userDetails?.docId}
          profileUserDocId={user.docId}
        />
      )}
    </div>
  );
}

export default ProfilePage;
