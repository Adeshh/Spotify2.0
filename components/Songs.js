import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import Song from '../components/Song'

const Songs = () => {
    const playlist = useRecoilValue(playlistState)

  return (
    <div className='text-white px-8 flex flex-col space-y-1 pb-28 '>
        {playlist?.tracks.items.map((track, i) =>(
           console.log(track.track),
            // <div key={track.track.name}>{track.track.name}</div>
            <Song key={track.track.id} track={track.track} order={i} />
        ))}
    </div>
  )
}

export default Songs