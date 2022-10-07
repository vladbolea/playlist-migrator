import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import useSWR from 'swr';
import PlaylistApiResponse from '../interfaces/playlist';
import fetcher from '../utils/fetcher';

const HomeContainer: NextPage = () => {
  const { data: session, status } = useSession();

  //this is how we'll make all the requests to the backend
  const { data, error } = useSWR<PlaylistApiResponse>(
    session ? ['api/spotify/playlists', session.accessToken, 'GET'] : null,
    fetcher
  );

  return <></>;
};

export default HomeContainer;
