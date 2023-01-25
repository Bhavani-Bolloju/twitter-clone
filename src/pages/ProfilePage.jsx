import React from "react";
import useUser from "../components/hooks/use-user";

function ProfilePage() {
  const { userDetails } = useUser();
  console.log(userDetails);

  return (
    <div className="bg-white border w-[100%]  border-gray-200">
      {userDetails && (
        <div className="flex flex-col ">
          <header className="h-12 ">
            <div className="bg-white/60 h-12 w-[600px] p-3 fixed">username</div>
          </header>
          <div className="self-stretch h-[100vh]">
            <div>
              <div></div>
              <div>profile</div>
            </div>
            <div>profile details</div>
            <main>main content</main>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
