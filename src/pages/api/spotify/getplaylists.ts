import { env } from '../../../env/server.mjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../prisma/prisma-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;
  const user = await prisma.account.findFirst({
    where: {
      id: userId,
    },
  });

  try {
    const playlists = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists?limit=50`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.access_token}`,
        },
        method: 'GET',
      }
    ).then((r) => r.json());

    console.log(`length ${playlists.items.length}`);

    res.status(200).json(playlists.items);
  } catch (error) {
    res.status(500).json(error);
  }
}
