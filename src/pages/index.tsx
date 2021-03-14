import { useContext, useState } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { signIn, useSession } from 'next-auth/client';

import { Anchor, Box, Button, DateInput, ResponsiveContext, Text } from 'grommet';
import { View } from 'grommet-icons';

import { Layout } from '@/components/Layout';
import { parseDateString } from '@/utils/api-parameters';

export default function Home() {
  const size = useContext(ResponsiveContext);
  const { push } = useRouter();
  const [session, loading] = useSession();
  const [date, setDate] = useState<string>(new Date().toISOString());

  const handleSignIn = () => signIn('google');

  const handleDateChange = ({ value }: { value: string | string[] }) => {
    if (Array.isArray(value)) return;

    setDate(value);
  };

  const handleView = () => {
    const url = parseDateString(date);

    push(`/day/${url}`);
  };

  return (
    <Layout loading={loading}>
      <Head>
        <title>página inicial | emooji</title>
      </Head>

      <Box background={{ color: 'background-front' }} round="medium" elevation="small" pad="large">
        {session ? (
          <Box direction="column" gap="medium" align="center">
            <Box width={size === 'small' ? 'full' : 'medium'}>
              <DateInput
                format="dd/mm/yyyy"
                calendarProps={{
                  fill: true,
                  locale: 'pt-BR',
                  daysOfWeek: true,
                }}
                value={date}
                onChange={handleDateChange}
              />
            </Box>

            <Box width={size === 'small' ? 'full' : 'small'}>
              <Button
                primary
                fill="horizontal"
                label="visualizar"
                icon={<View />}
                onClick={handleView}
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
