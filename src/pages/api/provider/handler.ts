import { NextApiRequest, NextApiResponse } from 'next';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { prisma } from '../../../server/db/client';
import { refreshAccessToken } from '../auth/[...nextauth]';

const providerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  console.log('Post request');
  console.log(`session ${JSON.stringify(session)}`);

  switch (req.method) {
    case 'POST':
      const { currentProvider } = req.body;
      const { neededProvider } = req.body;
      const email = session?.user?.email as string;

      if (currentProvider === 'spotify') {
        try {
          const userData = await prisma.user.findUnique({
            where: {
              email: email,
              id: session?.user?.id,
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
          console.log(userData);
        } catch (err) {
          console.log(err);
        }
      } else if (currentProvider === 'google') {
        try {
          const userData = await prisma.user.findUnique({
            where: {
              email: email,
              id: session?.user?.id,
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
              userData.accounts[0].access_token =
                newToken?.accessToken as string;

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

          console.log(userData);

          res.status(200).json(userData);
        } catch (err) {
          console.log(err);
        }
      }
  }
};

export default providerHandler;
