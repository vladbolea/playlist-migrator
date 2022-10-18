import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';
import PlaylistApiResponse from '../../../interfaces/playlist';
import ProviderHandlerApiReponse from '../../../interfaces/provider-handler.js';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { prisma } from '../../../server/db/client';

const playlists = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
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

  const user = await prisma?.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      spotifyProfile: true,
    },
  });

  const country = user?.spotifyProfile?.country;

  switch (method) {
    case 'GET':
      try {
        const fetchPlaylists = async (
          url: string
        ): Promise<PlaylistApiResponse> => {
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

        const response = await fetchPlaylists(
          `https://api.spotify.com/v1/browse/featured-playlists?country=${country}`
        );

        if (response.next) {
          let nextURL = response.next;

          while (nextURL) {
            const data = await fetchPlaylists(nextURL);
            response.items.push(...data.items);
            nextURL = data.next as string;
          }
          res.status(200).json(response);
        } else {
          res.status(200).json(response);
        }
      } catch (error) {
        res
          .status(400)
          .json({ message: `Playlists cannot be fetched, ${error}` });
      }
  }
};

export default playlists;
