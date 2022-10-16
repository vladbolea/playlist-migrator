import { signIn } from 'next-auth/react';

const SignIn = () => {
  return (
    <>
      <div className="text-white">
        <button
          onClick={() => {
            signIn('spotify');
          }}
        >
          Spotify
        </button>
        <button
          onClick={() => {
            signIn('google');
          }}
        >
          Google
        </button>
      </div>
    </>
  );
};

export default SignIn;
