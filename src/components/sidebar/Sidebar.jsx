import React from "react";
import { FiHome, FiMail } from "react-icons/fi";
import {
  HiOutlineBookmark,
  HiOutlineUser,
  HiDotsHorizontal,
} from "react-icons/hi";
import logo from "../../../public/twitter.svg";
import useUser from "../hooks/use-user";
import UserProfile from "../timeline/UserProfile";
import { NavLink } from "react-router-dom";
import * as routes from "../../constants/route-paths";

function Sidebar() {
  const { userDetails } = useUser();
  console.log(userDetails);

  return (
    <div className="fixed w-[250px] h-full border p-3 border-gray-200 bg-white">
      <div>
        <img src={logo} alt="twitter" className="w-8 mb-3" />
      </div>
      <div className="flex flex-col justify-between h-[90%]">
        <ul className="flex flex-col gap-8">
          <NavLink to={routes.home} className="flex items-center gap-2">
            <FiHome className="text-lg" />
            <p>Home</p>
          </NavLink>
          {/* <NavLink to="/messages" className="flex items-center gap-2">
            <FiMail className="text-lg" />
            <p>Messages</p>
          </NavLink> */}
          <NavLink to={routes.bookMark} className="flex items-center gap-2">
            <HiOutlineBookmark className="text-lg" />
            <p> BookMarks</p>
          </NavLink>
          <NavLink to={routes.profileuser} className="flex items-center gap-2">
            <HiOutlineUser className="text-xl" />
            <p> Profile</p>
          </NavLink>
        </ul>

        {userDetails && (
          <div className="hover:bg-slate-100 px-2 py-3 rounded-full hover:cursor-pointer flex items-center justify-between">
            <UserProfile
              imageSrc={userDetails.imageSrc}
              username={userDetails.username}
              fullname={userDetails.fullname}
            />
            <HiDotsHorizontal />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
