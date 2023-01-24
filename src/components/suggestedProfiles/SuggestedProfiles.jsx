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
    <div className="border bg-white border-gray-200 p-4 w-[300px]">
      <div className="bg-white fixed w-[300px]">
        <h3 className="text-sm my-4 text-grey-600">suggestions for you</h3>
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
