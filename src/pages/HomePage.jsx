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
    <div className="flex px-10 py-2 max-w-screen-xl mx-auto">
      <Sidebar />
      {userDetails && <TimeLine userDetails={userDetails} />}
      <SuggestedProfiles />
    </div>
  );
}

export default HomePage;
