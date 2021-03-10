import { useSession } from 'next-auth/client';

import { Box, Text } from 'grommet';

import { Layout } from '@/components/Layout';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <Layout loading={loading}>
      <Box background={{ color: 'background-front' }} round="medium" elevation="small" pad="large">
        {session ? (
          <Text>Logged in as {session.user.name}</Text>
        ) : (
          <Text>Sing in to continue </Text>
        )}
      </Box>
    </Layout>
  );
}
