import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';
import { refreshAccessToken } from '../auth/[...nextauth]';

const providerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);

  switch (req.method) {
    case 'POST':
      const { currentProvider } = req.body;
      const { neededProvider } = req.body;
      const { email } = req.body;

      if (currentProvider === 'spotify') {
        const userData = await prisma.user.findUnique({
          where: {
            email: email,
          },
          include: {
            accounts: {
              where: {
                provider: neededProvider,
              },
            },
          },
        });
        res.status(200).json(userData);
        return userData;
      } else if (currentProvider === 'google') {
        const userData = await prisma.user.findUnique({
          where: {
            email: email,
          },
          include: {
            accounts: {
              where: {
                provider: neededProvider,
              },
            },
          },
        });

        const accessToken = userData?.accounts[0]?.access_token;
        const refreshToken = userData?.accounts[0]?.refresh_token;
        const expiresAt = userData?.accounts[0]?.expires_at;

        if (
          expiresAt &&
          expiresAt * 1000 < Date.now() &&
          accessToken &&
          refreshToken
        ) {
          const newToken = await refreshAccessToken({
            accessToken,
            refreshToken,
            provider: 'spotify',
            accessTokenExpires: expiresAt,
          });

          if (userData.accounts[0]?.access_token) {
            userData.accounts[0].access_token = newToken?.accessToken as string;

            await prisma.account.update({
              where: {
                id: userData.accounts[0].id,
              },
              data: {
                access_token: newToken?.accessToken as string,
              },
            });
          }
        }

        res.status(200).json(userData);
      }
  }
};

export default providerHandler;
