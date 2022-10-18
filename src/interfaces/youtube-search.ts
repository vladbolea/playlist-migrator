export default interface YoutubeSearchApiResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: { totalResults: 1000000; resultsPerPage: 25 };
  items: YoutubeSearchItem[];
}

export interface YoutubeSearchItem {
  kind: 'youtube#searchResult';
  etag: string;
  id: { kind: 'youtube#video'; videoId: string };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: 120;
        height: 90;
      };
      medium: {
        url: string;
        width: 320;
        height: 180;
      };
      high: {
        url: string;
        width: 480;
        height: 360;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: Date;
  };
}
