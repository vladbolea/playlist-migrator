import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import useSWR from 'swr';
import RandBBanner from '../components/rb-banner';
import PlaylistApiResponse from '../interfaces/playlist';
import fetcher from '../utils/fetcher';

const HomeContainer: NextPage = () => {
  const { data: session, status } = useSession();

  //this is how we'll make all the requests to the backend
  const { data, error } = useSWR<PlaylistApiResponse>(
    session ? ['api/spotify/playlists', session.accessToken, 'GET'] : null,
    fetcher
  );

  return (
    <div className="h-full w-full bg-black">
      <div className="grid place-content-center pt-[100px]">
        <RandBBanner />
      </div>
      <div className="grid place-content-center pt-[100px]">
        <RandBBanner />
      </div>
    </div>
  );
};

export default HomeContainer;
