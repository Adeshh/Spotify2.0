import { useEffect } from 'react';
import {useSession, signIn } from "next-auth/react"
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
  const {data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      //If refreshtoken attempt fails, direct to login
      if(session.error === "RefreshAccessTokenError"){
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  },[session]);
  // console.log(session.user)
  return spotifyApi;
  
}

export default useSpotify;