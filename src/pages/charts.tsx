import { useEffect, useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { Anchor, Box, Text } from 'grommet';
import { getSession, signIn, useSession } from 'next-auth/client';
import useSWR from 'swr';

import { Layout } from '@/components/Layout';
import { MonthStepper } from '@/components/MonthStepper';
import { LineChart } from '@/components/LineChart';
import { PieChart } from '@/components/PieChart';
import { getDays } from '@/pages/api/days/index';
import { getDaysFromMonth } from '@/services/api';
import { getFirstDayOfMonth, getLastDayOfMonth } from '@/utils/dates';

interface ChartProps {
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

export default function Chart({ initialDays }: ChartProps) {
  const [session, loading] = useSession();
  const [date, setDate] = useState(initialDate);
  const [range, setRange] = useState(initialRange);
  const { data: days } = useSWR(['/api/days', range], () => getDaysFromMonth(range), {
    initialData: initialDays,
  });

  const handleSignIn = () => {
    signIn('google');
  };

  const handlePreviousMonth = () => {
    setDate((prev) =>
      prev.month <= 0 ? { year: prev.year - 1, month: 11 } : { ...prev, month: prev.month - 1 },
    );
  };

  const handleNextMonth = () => {
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
        <title>estatísticas | emooji</title>
      </Head>

      <Box
        fill
        background={{ color: 'background-front' }}
        round="medium"
        elevation="small"
        pad="small"
      >
        {session ? (
          <Box direction="column" gap="medium" align="center">
            <MonthStepper
              date={date}
              onNextMonth={handleNextMonth}
              onPreviousMonth={handlePreviousMonth}
            />

            {days.length === 0 ? (
              <Text margin="medium">sem dados suficientes.</Text>
            ) : (
              <>
                <Box fill="horizontal" height="medium">
                  <LineChart data={days || []} id={date.month} />
                </Box>

                <Box fill="horizontal" height="medium">
                  <PieChart data={days || []} />
                </Box>
              </>
            )}
          </Box>
        ) : (
          <Text margin="medium">
            faça o <Anchor label="login" onClick={handleSignIn} /> para continuar.
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
