import { signIn, useSession } from 'next-auth/client';

import Head from 'next/head';

import { Anchor, Box, Heading, Text } from 'grommet';

import { Layout } from '@/components/Layout';

export default function Home() {
  const [session, loading] = useSession();

  const handleSignIn = () => {
    signIn('google');
  };

  return (
    <Layout loading={loading}>
      <Head>
        <title>calendário | emooji</title>
      </Head>

      <Box background={{ color: 'background-front' }} round="medium" elevation="small" pad="large">
        {session ? (
          <Box direction="column" gap="medium" align="center">
            <Box>
              <Heading level="4" textAlign="center">
                📅 Calendário
              </Heading>
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
