import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import Background from '../components/background';
import { useSpotify } from '../utils/spotify';

const HomeContainer: NextPage = () => {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  const spotifyClient = useSpotify();
  // useEffect(() => {
  //   const getPlaylists = async () => {
  //     return await (
  //       await spotifyClient.getUserPlaylists()
  //     ).body;
  //   };

  //   if (session) {
  //     // const playlists = getPlaylists().then((playlists) => {
  //     //   setPlaylists(playlists.items);
  //     //   console.log(playlists);
  //     // });
  //   }
  // }, [session, spotifyClient]);

  return (
    <>
      {playlists.length > 0 &&
        playlists.map((playlist: any) => (
          <div key={playlist?.id}>
            {playlist.name} - <b>{playlist?.public}</b> <br />
          </div>
        ))}
      {status !== 'loading' && <HomePage session={session} status={status} />}
    </>
  );
};

export default HomeContainer;

const HomePage: FC<HomePageProps> = (props) => (
  <>
    <Background />
    {!props.session && (
      <div>{<Link href="/api/auth/signin">Sign in</Link>}</div>
    )}

    <div
      className="absolute left-0 right-0 bottom-8 mx-auto grid w-36 place-content-center rounded-md bg-purple-500 px-4 py-2 font-semibold hover:cursor-pointer"
      onClick={() => {
        signOut();
      }}
    >
      {JSON.stringify(props.session)}
    </div>
  </>
);

interface HomePageProps {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}
