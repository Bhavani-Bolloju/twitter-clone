import React, { useRef } from "react";

function Home({ avatarUrl, username, fullname, onReply }) {
  const textRef = useRef();

  return (
    <div className="flex gap-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={username}
          className="rounded-full w-11 h-11 object-cover"
        />
      ) : (
        <div className="rounded-full self-start w-11 mx-2 h-11 flex items-center justify-center bg-blue-700 text-gray-100 text-xl">
          {fullname[0].toUpperCase()}
        </div>
      )}
      <form
        className="w-[80%] flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          onReply(textRef.current.value);
          textRef.current.value = "";
        }}
      >
        <textarea
          name="userPost"
          className="resize-none w-full h-20 bg-transparent outline-none placeholder:text-gray-500 placeholder:text-lg text-base border-b mb-2 mt-2 border-gray-200"
          placeholder="What's happening?"
          ref={textRef}
        />
        <button className="bg-blue-600 text-sm px-4 py-1 rounded-2xl text-gray-100 self-end font-semibold">
          Tweet
        </button>
      </form>
    </div>
  );
}

export default Home;
