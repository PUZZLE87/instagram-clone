import React from "react";

function Story({ img, username }) {
  return (
    <div>
      <img
        src={img}
        alt=""
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain hover:scale-110 transition transfrom duration-200 ease-out cursor-pointer"
      />
      <p className="text-sm w-14 truncate text-center ">{username}</p>
    </div>
  );
}

export default Story;
