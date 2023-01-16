import React from 'react'
import {useSession} from "next-auth/react"
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from 'recoil';
import {playlistIdState, playlistState} from "../atoms/playlistAtom"
import useSpotify from '../hooks/useSpotify';
import Songs from '../components/Songs'


const colors = [
    "from-yellow-500",
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-pink-500",
    "from-purple-500",
    "from-gray-500",
    "from-indigo-500",
];

function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() =>{
        setColor(shuffle(colors).pop());
    }, [playlistId]);
 
    useEffect(() => {
      if (spotifyApi.getAccessToken()){
        spotifyApi
        .getPlaylist(playlistId)
        .then((data) =>{
          setPlaylist(data.body);
          //console.log(data.body);
        })
        .catch((err) => 
          console.log("something went wrong", err)
        );
      }
    },[spotifyApi, playlistId, session])

  return (
    <div className='flex-grow '>
       <header className='absolute top-5 right-8'>
            <div className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 '>
                <img className='rounded-full w-10 h-10' src= {session?.user.image} alt="" />
                <h2 className=''>{session?.user.name}</h2>
                <ChevronDownIcon className='h-5 w-5'/>
            </div>
       </header>
       <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
            <img 
              className='h-44 w-44 shadow-2xl'
              src={playlist?.images?.[0].url} alt="" 
            />k
            <div>
              <p>PLAYLIST</p>
              <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
                {playlist?.name}
              </h1>
            </div>
       </section>
       <div>
          <Songs />
       </div>
    </div>
  )
}

export default Center