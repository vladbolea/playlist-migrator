export default interface SpotifyProfile {
  country: string; //ex: "US"
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      height: number | null;
      url: string;
      width: number | null;
    }
  ];
  product: string;
  type: 'user';
  uri: string;
}
