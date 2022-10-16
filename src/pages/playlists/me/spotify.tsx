import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import Playlist, { PlaylistSkeleton } from '../../../components/playlist';
import SearchBar from '../../../components/search-bar';
import PlaylistApiResponse, {
  PlaylistItem,
} from '../../../interfaces/playlist';
import fetcher from '../../../utils/fetcher';

const PersonalPlaylists = () => {
  const { data: session } = useSession();
  const { data } = useSWR<PlaylistApiResponse>(
    ['/api/spotify/playlists', session?.accessToken, 'GET'],
    fetcher
  );
  const [search, setSearch] = useState('');
  const [, setSearchFocus] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistItem[]>(
    data?.items as PlaylistItem[]
  );
  const [searchResults, setSearchResults] = useState<PlaylistItem[]>();

  useEffect(() => {
    if (data) setPlaylists(data?.items as PlaylistItem[]);
  }, [data]);

  useMemo(() => {
    if (search === '' || search === ' ') setSearchResults(playlists);
    else {
      const filteredValues = playlists?.filter((playlist) => {
        if (
          playlist?.name
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        )
          return true;

        if (
          playlist?.owner.display_name
            .trim()
            .toLocaleLowerCase()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        )
          return true;

        // if (search.trim().toLowerCase() === 'me') return true;
      });

      setSearchResults(filteredValues);
    }
  }, [search, playlists]);

  return (
    <>
      <div className="h-full w-full text-white">
        <h1 className="my-10 text-center text-3xl text-gray-300">
          Choose a playlist
        </h1>
        <div className="mx-auto mb-14 w-[90%] md:w-[70%]">
          <SearchBar
            placeholder="Search playlists by name or by owner"
            search={search}
            setSearch={setSearch}
            setSearchFocus={setSearchFocus}
          />
        </div>
        <div className="mx-auto grid w-[95%] grid-cols-2 md:w-[60%] md:grid-cols-3 lg:grid-cols-4">
          {searchResults !== undefined ? (
            searchResults?.map((playlist) => (
              <Playlist key={playlist.id} info={playlist} />
            ))
          ) : (
            <PlaylistSkeleton />
          )}
        </div>
      </div>
    </>
  );
};

export default PersonalPlaylists;
