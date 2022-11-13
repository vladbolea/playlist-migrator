import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/client.mjs';
import { YoutubeSearchItem } from '../../../interfaces/youtube-search.js';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';

const exportPlaylist = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tracks }: { tracks: string[] } = req.body;
  const { googleAccessToken }: { googleAccessToken: string } = req.body;
  const { playlistId }: { playlistId: string } = req.body;

  const session = await getServerAuthSession({ req, res });

  const searchResultsPromiseArray: Promise<{ track: YoutubeSearchItem }>[] =
    tracks.map(
      async (track) =>
        await fetch(
          `${env.NEXT_PUBLIC_BASE_URL}/api/youtube/search?searchTerm=${track}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ googleAccessToken }),
          }
        ).then((r) => r.json())
    );

  const searchResults = await Promise.all(searchResultsPromiseArray);

  //create the export entity in the database
  const exportItem = await prisma?.exports.create({
    data: {
      export_date: new Date(Date.now()).toISOString(),
      exportTo: 'youtube',
      successful: true,
      playlist_id: playlistId,
      user: {
        connect: {
          email: session?.user?.email as string,
          id: session?.user?.id as string,
        },
      },
    },
  });

  //create the exported items in db for statistics
  searchResults.forEach(async (item) => {
    const exportedTrack = await prisma?.exportedItem.create({
      data: {
        channel: item?.track?.snippet?.channelTitle,
        link: `https://www.youtube.com/watch?v=${item?.track?.id?.videoId}`,
        title: item?.track?.snippet?.title,
        export: {
          connect: {
            id: exportItem?.id,
          },
        },
      },
    });
  });

  res.status(200).json({ searchResults });
};

export default exportPlaylist;
