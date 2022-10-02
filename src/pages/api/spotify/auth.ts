import { env } from '../../../env/server.mjs';

export default async function handler(req, res) {
  // const { accessToken } = req;

  const client_id = env.SPOTIFY_CLIENT_ID;
  const client_secret = env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = env.SPOTIFY_REDIRECT_URL;

  const data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('redirect_uri', redirect_uri);
  data.append('code', '');

  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret, 'base64').toString(
          'base64'
        ),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
    json: true,
  };

  try {
    const token = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions
    ).then((r) => r.json());

    console.log(token);

    res.status(200).json(token);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
}
