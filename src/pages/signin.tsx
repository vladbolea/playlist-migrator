import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { env } from '../env/client.mjs';
import ProviderHandlerApiReponse from '../interfaces/provider-handler.js';

const SignIn = () => {
  const handleSpotifyLogin = async () => {
    const spotifyUserData: ProviderHandlerApiReponse = await fetch(
      `${env.NEXT_PUBLIC_BASE_URL}/api/provider/handler`,
      {
        method: 'POST',
        body: JSON.stringify({
          currentProvider: 'spotify',
          neededProvider: 'google',
        }),
      }
    ).then((data) => data.json());

    const spotifyAccessToken = spotifyUserData.accounts[0]?.access_token;
    const spotifyRefreshToken = spotifyUserData.accounts[0]?.refresh_token;
    const spotifyTokenExpiresAt = spotifyUserData.accounts[0]?.expires_at;

    localStorage.setItem('spotifyAccessToken', spotifyAccessToken as string);
    localStorage.setItem('spotifyRefreshToken', spotifyRefreshToken as string);
    localStorage.setItem(
      'spotifyTokenExpiresAt',
      String(spotifyTokenExpiresAt) as string
    );

    console.log(spotifyUserData);
  };

  return (
    <>
      <div className="mx-auto mt-10 grid w-full text-white ">
        <h1></h1>

        <button
          onClick={() => {
            signIn('google');
          }}
          className={`my-2 mx-auto w-56 rounded-md border border-transparent bg-orange-500 py-2 px-3 font-semibold transition-all hover:bg-orange-400`}
        >
          Sign in with Google
        </button>
        <button
          onClick={() => {
            signIn('spotify').then(() => {
              handleSpotifyLogin();
            });
          }}
          className={`my-2 mx-auto w-56 rounded-md border border-transparent bg-green-500 py-2 px-3 font-semibold transition-all hover:bg-green-400`}
        >
          Sign in with Spotify
        </button>
      </div>
    </>
  );
};

export default SignIn;
