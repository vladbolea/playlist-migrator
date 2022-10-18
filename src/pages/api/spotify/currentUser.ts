import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyProfile from '../../../interfaces/spotifyProfile';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { prisma } from '../../../server/db/client';

const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { authorization } = req.headers;

  const session = await getServerAuthSession({ req, res });

  if (session?.provider === 'spotify') {
    switch (method) {
      case 'GET':
        try {
          const currentUser: SpotifyProfile = await fetch(
            'https://api.spotify.com/v1/me',
            {
              method: 'GET',
              headers: {
                method: 'GET',
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: authorization as string,
              },
            }
          ).then((res) => res.json());

          console.log(`currentUser.email ~> ${JSON.stringify(currentUser)}`);

          await prisma.user
            .upsert({
              where: {
                email: currentUser.email,
              },
              create: {
                spotifyProfile: {
                  create: {
                    display_name: currentUser.display_name,
                    email: currentUser.email,
                    external_urls: currentUser.external_urls.spotify,
                    followers: Number(currentUser.followers.total),
                    href: currentUser.href,
                    images: currentUser.images[0]?.url,
                    product: currentUser.product,
                    type: currentUser.type,
                    uri: currentUser.uri,
                    country: currentUser.country,
                  },
                },
              },
              update: {
                spotifyProfile: {
                  upsert: {
                    create: {
                      display_name: currentUser.display_name,
                      email: currentUser.email,
                      external_urls: currentUser.external_urls.spotify,
                      followers: Number(currentUser.followers.total),
                      href: currentUser.href,
                      images: currentUser.images[0]?.url,
                      product: currentUser.product,
                      type: currentUser.type,
                      uri: currentUser.uri,
                      country: currentUser.country,
                    },
                    update: {
                      display_name: currentUser.display_name,
                      email: currentUser.email,
                      external_urls: currentUser.external_urls.spotify,
                      followers: Number(currentUser.followers.total),
                      href: currentUser.href,
                      images: currentUser.images[0]?.url,
                      product: currentUser.product,
                      type: currentUser.type,
                      uri: currentUser.uri,
                      country: currentUser.country,
                    },
                  },
                },
              },
            })
            .then((data) => {
              console.log('merge', data);
            })
            .catch((err) => console.log('err ~> ', err));

          res.status(200).json({ success: true, data: currentUser });
        } catch (error) {
          res
            .status(400)
            .json({ message: `User data cannot pe fetched, error: ${error}` });
        }
    }
  }
  res.status(200).json({ success: true });
};

export default getCurrentUser;
