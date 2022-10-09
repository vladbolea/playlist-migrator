import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import Featured, { FeaturedSkeleton } from '../components/featured';
import RandBBanner from '../components/rb-banner';
import FeaturedApiResponse from '../interfaces/featured';
import fetcher from '../utils/fetcher';

const HomeContainer: NextPage = () => {
  const { data: session } = useSession();

  //this is how we'll make all the requests to the backend
  const { data } = useSWR<FeaturedApiResponse>(
    ['api/spotify/featured', session?.accessToken, 'GET'],
    fetcher
  );

  return (
    <div className="h-full min-h-screen w-full bg-black pb-14">
      <div className="grid place-content-center md:min-w-full">
        <h1 className="m-10 text-center text-3xl text-gray-300">
          Migrate your favorite playlists from Spotify to Youtube
        </h1>
        <RandBBanner />
        <div className="mx-auto grid grid-cols-2 justify-between gap-10 md:w-[85%x] md:max-w-[850px] md:grid-cols-4">
          {data ? (
            data?.playlists?.items?.map((item) => (
              <Featured
                key={item?.id}
                name={item?.name}
                image={item?.images[0]}
              />
            ))
          ) : (
            <FeaturedSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
