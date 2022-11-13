import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';
import YoutubeSearchApiResponse, {
  YoutubeSearchItem,
} from '../../../interfaces/youtube-search.js';
// import googleapis from 'googleapis/youtube';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const searchTerm = req.query.searchTerm as string;
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchTerm}&key=${env.GOOGLE_API_KEY}`;
  const googleAccessToken = req.body.googleAccessToken;

  try {
    if (googleAccessToken) {
      const searchResponse: YoutubeSearchApiResponse = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.log(error));
      const searchResults = searchResponse.items;

      //Filter out the song's remixes
      const noRemixes: YoutubeSearchItem[] = [];
      let officialSong: YoutubeSearchItem | null = null;

      for (let index = 0; index < searchResults.length; index++) {
        if (searchResults) {
          const searchResult = searchResults[index];
          if (
            searchResult?.snippet.title.toLocaleLowerCase().includes('Official')
          ) {
            officialSong = searchResult;
            break;
          }
          if (
            !searchResult?.snippet.title.toLocaleLowerCase().includes('Remix')
          ) {
            noRemixes.push(searchResult as YoutubeSearchItem);
          }
        }
      }

      const bestResult = officialSong || noRemixes[0];
      console.log(JSON.stringify(bestResult));

      res.status(200).json({ track: bestResult });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

export default search;
