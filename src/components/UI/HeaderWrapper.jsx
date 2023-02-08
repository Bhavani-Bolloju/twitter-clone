import React from "react";

function HeaderWrapper(props) {
  return (
    <header className=" h-16 relative w-[550px]">
      <div className="z-10 fixed  font-semibold text-lg py-3 px-5 bg-white/80 border-gray-200 header-div">
        {props.children}
      </div>
    </header>
  );
}

export default HeaderWrapper;
