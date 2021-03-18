import Head from 'next/head';

import { Anchor, Box, Heading, Text } from 'grommet';
import { signIn, useSession } from 'next-auth/client';

import { Layout } from '@/components/Layout';

export default function Chart() {
  const [session, loading] = useSession();

  const handleSignIn = () => {
    signIn('google');
  };

  return (
    <Layout loading={loading}>
      <Head>
        <title>página inicial | emooji</title>
      </Head>

      <Box background={{ color: 'background-front' }} round="medium" elevation="small" pad="small">
        {session ? (
          <Box direction="column" gap="medium" align="center">
            <Heading level="4" textAlign="center">
              Gráficos
            </Heading>
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
