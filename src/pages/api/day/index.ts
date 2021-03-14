import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/client';

import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session && session.user.email) {
    switch (req.method) {
      case 'POST':
        const { date, emoji } = req.body;

        const day = await prisma.day.upsert({
          where: { userEmail_date: { date, userEmail: session.user.email } },
          create: { date, emoji, user: { connect: { email: session.user.email } } },
          update: { date, emoji },
        });

        res.status(200).json({ day });

        break;
      default:
        res.status(405);
        break;
    }
  } else {
    res.status(401);
  }

  res.end();
}
