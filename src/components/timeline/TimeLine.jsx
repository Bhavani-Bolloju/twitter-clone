import React from "react";
import Home from "./Home";

function TimeLine({ userDetails }) {
  const { imageSrc, username, fullname } = userDetails;

  return (
    <div className="basis-1/2">
      <div className="p-2">
        <p className="font-semibold text-xl mb-2">Home</p>
        <Home avatarUrl={imageSrc} username={username} fullname={fullname} />
      </div>
    </div>
  );
}

export default TimeLine;
