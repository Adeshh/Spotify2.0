import React from "react";
import useSpotify from "../hooks/useSpotify";
import { useEffect } from "react";

const Song = ({ track }) => {
  console.log(track);

  return (
    <div>
      <div>
        {/* //<p>{track}</p> */}
        <div className="flex overflow-y-scroll overflow-scroll ">
          <img src={track.track.album.images[0].url} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Song;
