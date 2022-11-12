import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../env/server.mjs';
import YoutubeSearchApiResponse, {
  YoutubeSearchItem,
} from '../../../interfaces/youtube-search.js';
// import googleapis from 'googleapis/youtube';

const playlists = async (req: NextApiRequest, res: NextApiResponse) => {
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
      console.log(`aici coaie ${JSON.stringify(searchResponse)}`);
      const searchResults = searchResponse.items;

      console.log(`searchResults.length ${searchResults.length}`);

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

      // searchResults.forEach((item) => {
      //   const trackName = item.snippet.title.toLocaleLowerCase();
      //   if (!officialSong) {
      //     if (trackName.includes('remix')) noRemixes.push(item);
      //     if (trackName.includes('official')) officialSong = item;
      //   }
      // });

      console.log(`officialSong ${JSON.stringify(officialSong)}`);
      console.log(`noRemixes[0] ${noRemixes[0]}`);

      const bestResult = officialSong || noRemixes[0];

      res.status(200).json(bestResult);
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

export default playlists;
