import React from 'react'
import useSpotify from '../hooks/useSpotify'
import { useEffect } from 'react';

const Song = (order, track ) => {
    const spotifyApi = useSpotify();
    //console.log(track)
  
  return (
    <div>
        <div>
            <p>{order.order + 1 } </p>
            {/* //<p>{track}</p> */}
            {/* //<img src={track.track.album.images[0].url} alt="" /> */}
        </div>

    </div>
  )
}

export default Song