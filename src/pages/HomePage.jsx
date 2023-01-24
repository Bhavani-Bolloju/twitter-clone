import React from "react";

import useUser from "../components/hooks/use-user";
import TimeLine from "../components/timeline/TimeLine";

function HomePage() {
  const { userDetails } = useUser();

  return (
    <div className="relative gap-4 w-full">
      {userDetails && <TimeLine userDetails={userDetails} />}
    </div>
  );
}

export default HomePage;
