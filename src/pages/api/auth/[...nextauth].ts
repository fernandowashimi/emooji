import { NextApiRequest, NextApiResponse } from 'next';

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.SITE || process.env.LOCALHOST,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);
