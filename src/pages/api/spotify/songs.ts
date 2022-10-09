// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import SongApiResponse from '../../../interfaces/song';

const songs = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { authorization } = req.headers;
  const { playlistId } = req.query;

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
