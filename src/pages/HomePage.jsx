import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/authContext";
import Sidebar from "../components/sidebar/Sidebar";
import { getUserByUserId } from "../firebase/services";
import useUser from "../components/hooks/use-user";

import TimeLine from "../components/timeline/TimeLine";
import SuggestedProfiles from "../components/suggestedProfiles/SuggestedProfiles";

function HomePage() {
  const { userDetails } = useUser();

  return (
    <div className="relative grid grid-cols-home gap-4">
      <Sidebar />
      <div className="col-start-2 col-end-3 flex relative gap-5">
        {userDetails && <TimeLine userDetails={userDetails} />}
        <SuggestedProfiles />
      </div>
    </div>
  );
}

export default HomePage;
