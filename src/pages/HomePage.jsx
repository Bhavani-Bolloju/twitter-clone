import React from "react";

import useUser from "../components/hooks/use-user";
import TimeLine from "../components/timeline/TimeLine";
import HeaderWrapper from "../components/UI/HeaderWrapper";

function HomePage() {
  const { userDetails } = useUser();

  return (
    <>
      {userDetails && (
        <div className="flex-grow max-w-[550px]">
          <HeaderWrapper>Home</HeaderWrapper>
          <TimeLine userDetails={userDetails} />
        </div>
      )}
    </>
  );
}

export default HomePage;
