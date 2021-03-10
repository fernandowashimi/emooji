import Link from 'next/link';

import { Anchor, Avatar, Button, Box, Tip } from 'grommet';
import { Logout } from 'grommet-icons';
import { signIn, signOut, useSession } from 'next-auth/client';

import { EmojiAvatar } from '@/components/EmojiAvatar';

export function Header() {
  const [session] = useSession();

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn('google');
  };

  return (
    <Box fill direction="row" justify="between" align="center">
      <Box direction="row" align="center" gap="medium">
        {session ? <Avatar src={session.user.image!} /> : <EmojiAvatar />}

        <Link href="/">
          <Anchor label="início" />
        </Link>

        <Link href="/details">
          <Anchor label="calendário" />
        </Link>
      </Box>

      {session ? (
        <Tip content="sair">
          <Anchor icon={<Logout />} onClick={handleSignOut} />
        </Tip>
      ) : (
        <Button primary label="entrar" onClick={handleSignIn} style={{ fontWeight: 700 }} />
      )}
    </Box>
  );
}
