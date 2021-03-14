import { NextApiRequest, NextApiResponse } from 'next';

import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

import { prisma } from '@/lib/prisma';

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
};

export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);
