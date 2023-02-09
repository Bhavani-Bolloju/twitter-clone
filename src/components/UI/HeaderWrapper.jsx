import React from "react";
import logo from "../../../public/twitter.svg";

function HeaderWrapper(props) {
  return (
    <header className=" h-16  relative w-[550px] bg-white/80s ">
      <div className="z-10 fixed  font-semibold text-lg py-3 px-5 border-x border-gray-200 header-div flex gap-5 bg-white/80 ">
        <div>{props.children}</div>
        <img src={logo} alt="twitter" className="w-12 mb-3  sm:hidden " />
      </div>
    </header>
  );
}

export default HeaderWrapper;
