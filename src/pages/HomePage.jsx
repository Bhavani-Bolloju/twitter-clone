import React from "react";

import useUser from "../components/hooks/use-user";
import TimeLine from "../components/timeline/TimeLine";

function HomePage() {
  const { userDetails } = useUser();

  return (
    <>
      {userDetails && (
        <div className="col-span-1 ">
          <div className=" h-16 -mb-1">
            <header className="p-3 bg-white/80 w-[600px] h-16 fixed font-bold text-gray-800 text-lg z-10">
              Home
            </header>
          </div>
          <TimeLine userDetails={userDetails} />
        </div>
      )}
    </>
  );
}

export default HomePage;
