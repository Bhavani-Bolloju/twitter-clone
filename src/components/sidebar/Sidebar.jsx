import React, { useState } from "react";
import { FiHome, FiMail } from "react-icons/fi";
import {
  HiOutlineBookmark,
  HiOutlineUser,
  HiDotsHorizontal,
} from "react-icons/hi";
import logo from "../../../public/twitter.svg";
import useUser from "../hooks/use-user";
import UserProfile from "../timeline/UserProfile";
import { NavLink, useNavigate } from "react-router-dom";
import * as routes from "../../constants/route-paths";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Sidebar() {
  const { userDetails } = useUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="self-start shrink-1 w-[250px] max-xl:w-[100px] max-sm:w-0">
      <div className="nav-div p-5 flex flex-col max-lg:items-center max-sm:h-[7%] max-sm:w-[100%]  max-sm:bottom-0 max-sm:left-0  bg-white/80">
        <img src={logo} alt="twitter" className="max-sm:hidden w-9 mb-3" />

        <div className="flex flex-col justify-between w-full h-[90%]">
          <ul className="flex flex-col  max-sm:flex-row gap-10  w-full h-full max-lg:items-center max-sm:justify-center">
            <NavLink to={routes.home} className="flex items-center gap-2">
              <FiHome className="text-lg" />
              <p className="max-xl:hidden">Home</p>
            </NavLink>

            <NavLink to={routes.bookMark} className="flex items-center gap-2">
              <HiOutlineBookmark className="text-lg max-xl:text-xl" />
              <p className="max-xl:hidden"> BookMarks</p>
            </NavLink>
            <NavLink
              to={`/${userDetails?.username}`}
              className="flex items-center gap-2"
            >
              <HiOutlineUser className="text-xl" />
              <p className="max-xl:hidden"> Profile</p>
            </NavLink>
          </ul>

          {userDetails && (
            <div className="relative ">
              {open && (
                <div className="font-semibold absolute text-xs w-full  bottom-20 -right-5 text-center max-xl:bottom-12 max-xl:-right-0 max-sm:-right-[180px]">
                  <button
                    onClick={() => {
                      signOut(auth);
                      navigate(routes.signin);
                    }}
                    className="bg-white text-gray-800 hover:text-blue-400 px-2 py-2 rounded-xl "
                  >
                    <div className="font-semibold w-full shadow-2xl ">
                      Logout
                    </div>{" "}
                    @{userDetails?.username}
                  </button>
                </div>
              )}

              <div className=" px-2 py-3 rounded-full hover:cursor-pointer flex items-center justify-between ">
                <div className="max-xl:hidden">
                  <UserProfile
                    imageSrc={userDetails.imageSrc}
                    username={userDetails.username}
                    fullname={userDetails.fullname}
                  />
                </div>

                <HiDotsHorizontal
                  className="max-xl:hidden"
                  onClick={() => setOpen((prev) => !prev)}
                />

                <img
                  onClick={() => setOpen((prev) => !prev)}
                  src={userDetails.imageSrc}
                  className="w-8 h-8 object-cover rounded-full  xl:hidden max-sm:fixed z-50 max-sm:bottom-2 max-sm:right-10"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
