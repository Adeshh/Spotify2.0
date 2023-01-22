import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import Song from '../components/Song'
import { useState } from 'react';

const Songs = () => {
    const playlist = useRecoilValue(playlistState)
    
  return (
    <div className='text-white px-8 flex flex-col space-y-1 pb-28 '>
        {playlist?.tracks.items.map((track, i) =>(
            <Song track={track} />
        ))}
    </div>
  )
}

export default Songs