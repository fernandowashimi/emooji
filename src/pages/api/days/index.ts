import { NextApiRequest, NextApiResponse } from 'next';

import { getSession, Session } from 'next-auth/client';

import { prisma } from '@/lib/prisma';

interface GetDaysParams {
  params: {
    gte: string;
    lte: string;
  };
  session: Session | null;
}

interface GetDayParams {
  params: {
    dateString: string | undefined;
  };
  session: Session | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session && session.user.email) {
    switch (req.method) {
      case 'GET':
        const { gte, lte } = req.query;

        if (!gte || !lte) {
          res.status(400);
          break;
        }

        const days = await prisma.day.findMany({
          where: {
            userEmail: session.user.email,
            date: {
              gte: new Date(String(gte)),
              lte: new Date(String(lte)),
            },
          },
          select: {
            id: true,
            date: true,
            emoji: true,
          },
        });

        res.status(200).json(days);

        break;
      case 'POST':
        const { date, emoji } = req.body;

        if (!date || !emoji) {
          res.status(400);
          break;
        }

        const day = await prisma.day.upsert({
          where: {
            userEmail_date: {
              date,
              userEmail: session.user.email,
            },
          },
          create: {
            date,
            emoji,
            user: {
              connect: {
                email: session.user.email,
              },
            },
          },
          update: {
            date,
            emoji,
          },
          select: {
            id: true,
            date: true,
            emoji: true,
          },
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

export async function getDays({ params, session }: GetDaysParams) {
  if (session && session.user.email) {
    const { gte, lte } = params;

    const days = await prisma.day.findMany({
      where: {
        userEmail: session.user.email,
        date: {
          gte: new Date(String(gte)),
          lte: new Date(String(lte)),
        },
      },
      select: {
        id: true,
        date: true,
        emoji: true,
      },
    });

    return days.map((d) => ({ ...d, date: d.date.toJSON() }));
  } else {
    return null;
  }
}

export async function getDay({ params, session }: GetDayParams) {
  if (session && session.user.email) {
    const { dateString } = params;

    if (!dateString) return null;

    const date = new Date(dateString);

    const day = await prisma.day.findUnique({
      where: {
        userEmail_date: {
          date,
          userEmail: session.user.email,
        },
      },
    });

    return day
      ? {
          ...day,
          date: day.date.toJSON(),
        }
      : null;
  } else {
    return null;
  }
}
