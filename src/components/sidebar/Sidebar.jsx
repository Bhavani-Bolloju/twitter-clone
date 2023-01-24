import React from "react";

function Sidebar() {
  return (
    <div className="fixed w-[250px] h-full border border-gray-200 bg-white">
      <div className="flex flex-col justify-between h-full">
        <ul>
          <li>Home</li>
          <li>Messages</li>
          <li>BookMarks</li>
          <li>Profile</li>
        </ul>

        <div>
          <p>userlogout</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
