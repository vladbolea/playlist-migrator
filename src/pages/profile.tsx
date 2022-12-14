import { FC, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Loader from '../static/icons/loader.svg';
import { env } from '../env/client.mjs';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';

const Profile: FC = () => {
  const [loading, setLoading] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState<string>();

  const onLoginSuccess = async (
    credentials: Omit<
      TokenResponse,
      'error' | 'error_description' | 'error_uri'
    >
  ) => {
    localStorage.setItem(
      'google_access_token',
      credentials.access_token as string
    );
    setGoogleAccessToken(credentials.access_token as string);

    //add the token to expire after 1 hour from now
    localStorage.setItem('google_expires_at', String(Date.now() + 3600000));
    const data = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/youtube/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleAccessToken: credentials.access_token,
      }),
    }).then((r) => r.json());
    console.log(data);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => onLoginSuccess(credentialResponse),
    hint: 'email',
    flow: 'implicit',
    scope: 'https://www.googleapis.com/auth/youtube',
  });

  const handleSignOut = async () => {
    googleLogout();
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_expires_at');

    setGoogleAccessToken(undefined);
  };

  useEffect(() => {
    const googleAccessToken = localStorage.getItem('google_access_token');
    if (googleAccessToken) {
      setGoogleAccessToken(googleAccessToken);
    }
  }, [googleAccessToken]);

  return (
    <div className="grid h-full min-h-screen w-full place-content-center bg-black">
      <div>
        <p>Profile</p>

        <div className="my-5">
          {!googleAccessToken ? (
            <>
              <h2 className="mb-1 text-gray-300">Link your google account</h2>
              <h3 className="mt-1 mb-2 text-gray-500">
                Needed for playlist migration to your YouTube account.
              </h3>

              <button
                onClick={() => googleLogin()}
                className="my-5 grid h-11 w-[260px] place-content-center rounded-md bg-red-500 px-5 py-2 font-bold transition-all hover:bg-red-400"
              >
                Login With Google
              </button>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="my-5 grid h-11 w-[360px] place-content-center rounded-md bg-red-500 px-5 py-2 font-bold transition-all hover:bg-red-400"
            >
              Logout from the Google Account
            </button>
          )}
        </div>

        <button
          onClick={() => {
            setLoading(true);
            signOut({
              redirect: true,
              callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
            });
          }}
          className="grid h-11 w-28 place-content-center rounded-md bg-yellow-500 px-5 py-2 font-bold transition-all hover:bg-yellow-400"
        >
          {loading ? (
            <Image
              className="animate-spin"
              src={Loader}
              width={30}
              height={30}
              alt="Loader"
            />
          ) : (
            'Sign out'
          )}
        </button>
      </div>
    </div>
  );
};
export default Profile;
