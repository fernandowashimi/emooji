import Head from 'next/head';

import { Anchor, Box, CheckBox, Text } from 'grommet';
import { signIn, useSession } from 'next-auth/client';

import { Layout } from '@/components/Layout';
import { useTheme } from '@/providers/ThemeProvider';

export default function Home() {
  const [session, loading] = useSession();
  const { mode, toggleMode } = useTheme();

  const handleSignIn = () => {
    signIn('google');
  };

  return (
    <Layout loading={loading}>
      <Head>
        <title>configurações | emooji</title>
      </Head>

      <Box background={{ color: 'background-front' }} round="medium" pad="small">
        {session ? (
          <Box direction="column" gap="medium" align="center" pad="medium">
            <Box fill="horizontal" direction="row" justify="between">
              <Text>Modo noturno</Text>

              <CheckBox toggle checked={mode === 'dark'} onChange={toggleMode} />
            </Box>
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
