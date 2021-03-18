import { useEffect, useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { getSession, signIn, useSession } from 'next-auth/client';

import { Anchor, Box, Button, Heading, Text } from 'grommet';
import { Next, Previous } from 'grommet-icons';
import useSWR from 'swr';

import { Layout } from '@/components/Layout';
import { CalendarGrid } from '@/components/CalendarGrid';
import { getDays } from '@/pages/api/days';
import { getDaysFromMonth } from '@/services/api';
import { getMonthName, getFirstDayOfMonth, getLastDayOfMonth } from '@/utils/dates';

interface HomeProps {
  initialDays: Array<Application.Day>;
}

const today = new Date();
const initialMonth = today.getMonth();
const initialYear = today.getUTCFullYear();
const initialRange = {
  gte: getFirstDayOfMonth(initialYear, initialMonth).string,
  lte: getLastDayOfMonth(initialYear, initialMonth).string,
};
const initialDate = {
  year: initialYear,
  month: initialMonth,
};

export default function Home({ initialDays }: HomeProps) {
  const [session, loading] = useSession();
  const [range, setRange] = useState(initialRange);
  const [date, setDate] = useState(initialDate);
  const [animation, setAnimation] = useState<'slideLeft' | 'slideRight' | undefined>(undefined);
  const { data: days } = useSWR(['/api/days', range], () => getDaysFromMonth(range), {
    initialData: initialDays,
  });

  const handleSignIn = () => {
    signIn('google');
  };

  const handlePreviousMonth = () => {
    setAnimation('slideRight');
    setDate((prev) =>
      prev.month <= 0 ? { year: prev.year - 1, month: 11 } : { ...prev, month: prev.month - 1 },
    );
  };

  const handleNextMonth = () => {
    setAnimation('slideLeft');
    setDate((prev) =>
      prev.month >= 11 ? { year: prev.year + 1, month: 0 } : { ...prev, month: prev.month + 1 },
    );
  };

  useEffect(() => {
    const gte = getFirstDayOfMonth(date.year, date.month).string;
    const lte = getLastDayOfMonth(date.year, date.month).string;

    setRange({ gte, lte });
  }, [date]);

  return (
    <Layout loading={loading}>
      <Head>
        <title>página inicial | emooji</title>
      </Head>

      <Box background={{ color: 'background-front' }} round="medium" elevation="small" pad="small">
        {session ? (
          <Box direction="column" gap="medium" align="center">
            <Box
              fill="horizontal"
              direction="row"
              justify="between"
              align="center"
              pad={{ horizontal: 'small' }}
            >
              <Heading level="4" textAlign="center">
                📅 {getMonthName(date.month)} de {date.year}
              </Heading>
              <Box direction="row">
                <Button hoverIndicator icon={<Previous />} onClick={handlePreviousMonth} />
                <Button
                  hoverIndicator
                  icon={<Next />}
                  onClick={handleNextMonth}
                  disabled={date.month === initialMonth && date.year === initialYear}
                />
              </Box>
            </Box>

            <Box width="full" direction="column">
              <CalendarGrid
                days={days || []}
                year={date.year}
                month={date.month}
                animation={animation}
              />
            </Box>
          </Box>
        ) : (
          <Text>
            Faça o <Anchor label="login" onClick={handleSignIn} /> para continuar.
          </Text>
        )}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  return {
    props: {
      initialDays: await getDays({ params: initialRange, session }),
    },
  };
}
