// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/client.mjs';
import ProviderHandlerApiReponse from '../../../interfaces/provider-handler.js';
import SongApiResponse from '../../../interfaces/song';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';

const songs = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { playlistId } = req.query;

  let authorization = req.headers?.authorization;

  const session = await getServerAuthSession({ req, res });
  if (session?.provider === 'google') {
    const providerHandler: ProviderHandlerApiReponse = await fetch(
      `${env.NEXT_PUBLIC_BASE_URL}/api/provider/handler`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          currentProvider: session?.provider,
          email: session?.user?.email,
          neededProvider: 'spotify',
        }),
      }
    ).then((res) => res.json());

    authorization = `Bearer ${providerHandler?.accounts[0]?.access_token}`;
  }

  switch (method) {
    case 'GET':
      try {
        const fetchSongs = async (url: string): Promise<SongApiResponse> => {
          const data = await fetch(url, {
            method: 'GET',
            headers: {
              method: 'GET',
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: authorization as string,
            },
          }).then((res) => res.json());
          return data;
        };

        const response = await fetchSongs(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
        );

        if (response.next) {
          let nextURL = response.next;

          while (nextURL) {
            const data = await fetchSongs(nextURL);
            response.items.push(...data.items);
            nextURL = data.next as string;
          }
          res.status(200).json(response);
        } else {
          res.status(200).json(response);
        }
      } catch (error) {
        res.status(400).json({ message: `Songs cannot be fetched, ${error}` });
      }
  }
};

export default songs;
