import React, { useEffect, useState } from "react";
import { getSuggestedProfiles } from "../../firebase/services";
import useUser from "../hooks/use-user";
import SuggestedProfile from "./SuggestedProfile";

function SuggestedProfiles() {
  const { userDetails } = useUser();
  const [toFollowList, setToFollowList] = useState(null);

  useEffect(() => {
    const suggestedProfilesList = async function () {
      const res = await getSuggestedProfiles(
        userDetails?.uid,
        userDetails?.following
      );
      setToFollowList(res);
    };

    if (userDetails) {
      suggestedProfilesList();
    }
  }, [userDetails]);

  return (
    <div className="relative max-lg:hidden w-[300px]">
      <div className="fixed h-full suggested-div  bg-gray-50 p-3 z-10 border">
        <h3 className="text-sm my-4 text-grey-600 w-full">
          suggestions for you
        </h3>
        <ul className="list-none flex flex-col gap-3">
          {toFollowList &&
            userDetails &&
            toFollowList.map((profile) => (
              <SuggestedProfile
                key={profile?.docId}
                spDocId={profile?.docId}
                spUsername={profile?.username}
                spFullname={profile?.fullname}
                userId={userDetails?.uid}
                userDocId={userDetails.docId}
                spUserId={profile?.uid}
                imageSrc={profile?.imageSrc}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SuggestedProfiles;
