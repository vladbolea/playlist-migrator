export default interface ProviderHandlerApiReponse {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
  accounts: ProviderHandlerAccount[];
}

export interface ProviderHandlerAccount {
  id: string;
  userId: string;
  type: string;
  provider: 'google' | 'spotify';
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: Date;
  token_type: 'Bearer';
  scope: string;
  id_token: string;
  session_state: string | null;
}
