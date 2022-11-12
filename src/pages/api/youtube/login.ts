import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';
import YoutubeSearchApiResponse from '../../../interfaces/youtube-search.js';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';

const playlists = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  const googleAccessToken = req.body.googleAccessToken;

  

  res.status(200).json({ data: { somedata: 'merge' } });
};

export default playlists;
