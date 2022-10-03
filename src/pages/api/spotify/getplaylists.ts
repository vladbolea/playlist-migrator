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
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
        method: 'GET',
      }
    ).then((r) => r.json());

    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json(error);
  }
}
