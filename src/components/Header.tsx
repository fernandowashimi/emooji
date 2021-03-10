import { signIn, signOut, useSession } from 'next-auth/client';

export function Header() {
  const [session, loading] = useSession();

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {session ? (
            <button onClick={() => signOut()}>logout</button>
          ) : (
            <button onClick={() => signIn('google')}>login</button>
          )}
        </>
      )}
    </div>
  );
}
