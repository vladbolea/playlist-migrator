import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/client.mjs';
import SpotifyProfile from '../../../interfaces/spotifyProfile';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { prisma } from '../../../server/db/client';

const exportPlaylist = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { tracks }: { tracks: string[] } = req.body;
  const { googleAccessToken }: { googleAccessToken: string } = req.body;

  const searchResultsPromiseArray = tracks.map(async (track) => {
    await fetch(
      `${env.NEXT_PUBLIC_BASE_URL}/api/youtube/search?searchTerm=${track}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ googleAccessToken }),
      }
    );
  });

  const searchResults = await Promise.all(searchResultsPromiseArray);

  console.log(`searchResults ${JSON.stringify(searchResults)}`);

  res.status(200).json({ searchResults });
};

export default exportPlaylist;
