import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import useSWR from 'swr';
import Playlist from '../../../components/playlist';
import PlaylistApiResponse from '../../../interfaces/playlist';
import fetcher from '../../../utils/fetcher';

const PersonalPlaylists = () => {
  const { data: session } = useSession();

  const { data } = useSWR<PlaylistApiResponse>(
    ['/api/spotify/playlists', session?.accessToken, 'GET'],
    fetcher
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="h-full w-full text-white">
        <h1 className="my-14 text-center text-3xl text-gray-300">
          Choose a playlist
        </h1>
        <div className="mx-auto grid w-[95%] grid-cols-2 md:w-[80%] md:grid-cols-4">
          {data &&
            data?.items?.map((playlist) => (
              <Playlist key={playlist.id} info={playlist} />
            ))}
        </div>
      </div>
    </>
  );
};

export default PersonalPlaylists;
