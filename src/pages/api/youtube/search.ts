import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';
import YoutubeSearchApiResponse from '../../../interfaces/youtube-search.js';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
// import googleapis from 'googleapis/youtube';

const playlists = async (req: NextApiRequest, res: NextApiResponse) => {
  const searchTerm = req.query.searchTerm as string;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchTerm}&key=${env.GOOGLE_API_KEY}`;
  const session = await getServerAuthSession({ req, res });

  if (session?.provider === 'google') {
    const data: YoutubeSearchApiResponse = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    }).then((res) => res.json());

    res.status(200).json(data);
  }
};

export default playlists;
