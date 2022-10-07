export default interface PlaylistApiResponse {
  href: string;
  items: PlaylistItem[];
  limit: 20;
  next: string | null;
  offset: 0;
  previous: null;
  total: 25;
}

export interface PlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: 'playlist';
  uri: string;
}
