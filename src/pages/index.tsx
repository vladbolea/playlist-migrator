import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import useSWR from 'swr';
import Featured from '../components/featured';
import RandBBanner from '../components/rb-banner';
import PlaylistApiResponse from '../interfaces/playlist';
import fetcher from '../utils/fetcher';

const HomeContainer: NextPage = () => {
  const { data: session, status } = useSession();

  //this is how we'll make all the requests to the backend
  const { data, error } = useSWR<any>(
    session ? ['api/spotify/featured', session.accessToken, 'GET'] : null,
    fetcher
  );

  useEffect(() => {
    if (data) console.log(data?.playlists?.items);
  }, [data]);

  return (
    <div className="h-full min-h-screen w-full bg-black">
      <div className="grid place-content-center pt-[100px]">
        <RandBBanner />
        <div className="flex w-[950px] flex-wrap justify-between">
          {data &&
            data.playlists &&
            data?.playlists?.items?.map((item: any) => (
              <Featured key={item.id} name={item.name} image={item.images[0]} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
