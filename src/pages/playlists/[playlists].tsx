import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import ExportButton from '../../components/export-button';
import Song, { SongSkeleton } from '../../components/song';

import SongApiResponse from '../../interfaces/song.js';
import fetcher from '../../utils/fetcher';

const Playlists: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
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

  useEffect(() => {
    if (data) {
      setTracks(data?.items);
      console.log(data?.items?.length);
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

  const handleExport = () => {
    const filteredTracks = tracks?.filter((track) => track?.removed !== true);

    const tracksExported = filteredTracks?.map((track) => {
      return {
        name: track?.track?.name,
        artist: track?.track?.artists[0].name,
      };
    });
    console.log(tracksExported);
  };

  return (
    <>
      <div className="w-full">
        <h1 className="m-10 text-center text-3xl text-gray-300">
          Select the tracks you want to import into your youtube account
        </h1>
      </div>
      <div className="mx-auto md:w-5/12">
        {tracks ? (
          tracks?.map((song) => (
            <Song key={song.track.id} info={song} toggleTrack={toggleTrack} />
          ))
        ) : (
          <SongSkeleton />
        )}
      </div>
      <ExportButton tracksCount={tracksCount} handleExport={handleExport} />
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
