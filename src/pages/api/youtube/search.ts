import type { NextApiRequest, NextApiResponse } from 'next';
import PlaylistApiResponse from '../../../interfaces/playlist';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { prisma } from '../../../server/db/client';

import { google } from 'googleapis';

const playlists = async (req: NextApiRequest, res: NextApiResponse) => {

  const youtube = google?.youtube_v3?.Youtube({
    
  })

  const url = `https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?
    part=snippet
    &order=viewCount
    &q=skateboarding+dog
    &type=video
    &videoDefinition=high`;

  const data = await fetch(url, {});
};

export default playlists;
