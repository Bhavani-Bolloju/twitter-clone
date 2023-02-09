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
    <div className="flex justify-center items-center max-sm:w-[100%]  border-gray-400  max-w-[1200px] m-auto">
      <Sidebar />
      <div className="flex-grow min-w-[400px] max-w-[50%]">
        <Outlet />
      </div>
      <SuggestedProfiles />
    </div>
  );
}

export default DashBoardPage;
