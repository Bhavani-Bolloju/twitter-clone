import React, { useEffect } from "react";
import Home from "./Home";
import { getPosts } from "../../firebase/services";

function TimeLine({ userDetails }) {
  const { imageSrc, username, fullname, uid, following } = userDetails;
  // console.log(following);

  return (
    <div className="basis-1/2">
      <div className="p-2">
        <p className="font-semibold text-xl mb-2">Home</p>
        <Home
          avatarUrl={imageSrc}
          username={username}
          fullname={fullname}
          following={following}
        />
      </div>
    </div>
  );
}

export default TimeLine;
