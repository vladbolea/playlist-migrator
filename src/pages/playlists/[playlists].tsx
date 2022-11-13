import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import ExportButton from '../../components/export-button';
import Song, { SongSkeleton } from '../../components/song';
import SearchBar from '../../components/search-bar';
import SongApiResponse, { SongItem } from '../../interfaces/song.js';
import fetcher from '../../utils/fetcher';
import { env } from '../../env/client.mjs';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

const Playlists: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const router = useRouter();

  const { data: session } = useSession();
  const { data } = useSWR<SongApiResponse>(
    [
      `/api/spotify/songs?playlistId=${props.playlistId}`,
      session?.accessToken,
      'GET',
    ],
    fetcher
  );
  const [tracks, setTracks] = useState(data?.items);
  const [tracksCount, setTracksCount] = useState(0);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SongItem[]>();

  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    if (data) {
      setTracks(data?.items);
    }
  }, [data]);

  const toggleTrack = (index: string) => {
    const newTracks = tracks?.map((track) => {
      if (track?.track?.id === index) {
        if (track.removed === undefined) {
          track.removed = true;
        } else {
          track.removed = !track.removed;
        }
      }
      return track;
    });
    setTracks(newTracks);
  };

  useMemo(() => {
    if (tracks && tracks?.length > 0) {
      const removed = tracks?.filter((track) => track?.removed === true);
      setTracksCount((tracks?.length as number) - (removed?.length as number));
    }
  }, [tracks]);

  const handleExport = async () => {
    const filteredTracks = tracks?.filter((track) => track?.removed !== true);

    const tracksExported = filteredTracks?.map(
      (track) => `${track?.track?.name} ${track?.track?.artists[0].name}`
    );

    const googleAccessToken = localStorage.getItem('google_access_token');
    const googleExpiresIn = Number(localStorage.getItem('google_expires_at'));

    const isTokenValid = googleExpiresIn > Date.now();

    if (!isTokenValid) {
      router.push('/profile');
    }

    if (googleAccessToken) {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BASE_URL}/api/spotify/export`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tracks: tracksExported,
            googleAccessToken: googleAccessToken,
            playlistId: props.playlistId,
          }),
        }
      ).then((res) => res.json());

      console.log(response);
    } else {
      router.push('/profile');
    }
  };

  useMemo(() => {
    if (search === '' || search === ' ') setSearchResults(tracks);
    else {
      const filteredValues = tracks?.filter((track) => {
        if (
          track?.track?.name
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        )
          return true;

        if (
          track?.track?.artists[0].name
            .trim()
            .toLocaleLowerCase()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        )
          return true;

        if (
          track?.track?.album?.name
            .trim()
            .toLocaleLowerCase()
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase())
        )
          return true;
      });

      setSearchResults(filteredValues);
    }
  }, [search, tracks]);

  return (
    <>
      <div className="w-full">
        <h1 className="m-10 text-center text-3xl text-gray-300">
          Select the tracks you want to import into your youtube account
        </h1>
      </div>
      <div className="mx-auto mb-10 w-[90%] md:w-[70%] md:min-w-[600px]">
        <SearchBar
          placeholder="Search for tracks, albums or artists"
          search={search}
          setSearch={setSearch}
          setSearchFocus={setSearchFocus}
        />
      </div>
      <div className="mx-auto mt-10 md:w-2/3 md:max-w-[760px]">
        {searchResults !== undefined ? (
          searchResults?.map((song) => (
            <Song key={song.track.id} info={song} toggleTrack={toggleTrack} />
          ))
        ) : (
          <SongSkeleton />
        )}
      </div>
      <ExportButton
        tracksCount={tracksCount}
        handleExport={handleExport}
        searchFocus={searchFocus}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playlistId = context.params?.playlists as string;

  return {
    props: {
      playlistId,
    },
  };
};

export default Playlists;
