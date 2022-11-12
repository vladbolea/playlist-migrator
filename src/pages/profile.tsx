import { FC, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Loader from '../static/icons/loader.svg';
import { env } from '../env/client.mjs';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const Profile: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const response = await fetch('/api/youtube/login');
    const data = await response.json();
    //compose body
  };

  return (
    <div className="grid h-full min-h-screen w-full place-content-center bg-black">
      <div>
        <p>Profile</p>
        {/* <button className="my-5 grid h-11 w-[260px] place-content-center rounded-md bg-red-500 px-5 py-2 font-bold transition-all hover:bg-red-400"> */}
        {/* Connect with YouTube */}
        <GoogleOAuthProvider clientId={env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log('Success', credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            auto_select={true}
            // hosted_domain={env.NEXT_PUBLIC_BASE_URL}
          />
        </GoogleOAuthProvider>
        ;{/* </button> */}
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
