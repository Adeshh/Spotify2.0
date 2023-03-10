import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

const refreshAccessToken = async (token) => {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        //console.log("refreshed token is", refreshedToken);

        return{
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in *1000,//spotify api returns 3600 as 1 hr multiply by 1000 to convert into milisecond
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,//replace value if new one came with refreshedToken. if not keep the original one
        }
    } catch (error) {
        console.error(error);

        return{
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL ,
    }),
    // ...add more providers here.
  ],
  secret : process.env.JWT_SECRET,
  pages : {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, account, user }){
        //initial sign in
        if (account && user) {
            return{
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at *1000, //time in milliseconds thats why * 1000
            }  
        }

        //Return the privious token if access token not expired yet
        if (Date.now()< token.accessTokenExpires){
            return token;
        }
        
        //refresh access token if it has expired
        console.log("ACCESS TOKEN EXPIRED, REFRESHING...");
        return await refreshAccessToken(token);
    },
    async session({ session, token }){
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;
        return session;
    }
  }
})

// export default NextAuth(authOptions)