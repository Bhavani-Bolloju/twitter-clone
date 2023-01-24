import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import TimeLine from "../components/timeline/TimeLine";
import SuggestedProfiles from "../components/suggestedProfiles/SuggestedProfiles";
import useUser from "../components/hooks/use-user";
import HomePage from "./HomePage";
import { Outlet } from "react-router-dom";

function DashBoardPage() {
  const { userDetails } = useUser();
  return (
    <div className="relative grid grid-cols-home gap-4">
      <Sidebar />
      <div className="col-start-2 col-end-3 flex relative gap-5">
        <Outlet />
        <SuggestedProfiles />
      </div>
    </div>
  );
}

export default DashBoardPage;
