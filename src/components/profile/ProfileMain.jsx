import React from "react";
import { NavLink, Routes, Route, useParams, Outlet } from "react-router-dom";
import * as routes from "../../constants/route-paths";

function ProfileMain({ profileUserId }) {
  const params = useParams();
  const userPathId = params.id;

  return (
    <div>
      <nav>
        <ul className="text-sm text-gray-500 font-semibold pb-2 flex justify-around border-b border-gray-200">
          <NavLink to={`/${userPathId}/${routes.tweets}`}>Tweets</NavLink>
          <NavLink to={`/${userPathId}/${routes.t_r}`}>
            Tweets and replies
          </NavLink>
          <NavLink to={`/${userPathId}/${routes.likes}`}>Likes</NavLink>
        </ul>
      </nav>
      <main className="p-3 min-h-full">
        <Outlet context={[userPathId, profileUserId]} />
      </main>
    </div>
  );
}

export default ProfileMain;
