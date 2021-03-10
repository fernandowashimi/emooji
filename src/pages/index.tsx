import { useSession } from 'next-auth/client';

import { Layout } from '@/components/Layout';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <Layout>
      {loading ? <h1>Loading...</h1> : <>{session ? <h1>Logado</h1> : <h1>Deslogado</h1>}</>}
    </Layout>
  );
}
