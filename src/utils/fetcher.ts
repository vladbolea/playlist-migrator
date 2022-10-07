const fetcher = (
  url: string,
  accessToken: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
) =>
  fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());

export default fetcher;
