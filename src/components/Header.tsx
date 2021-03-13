import { useCallback, useContext } from 'react';

import { useRouter } from 'next/router';

import { Anchor, Avatar, Button, Box, Menu, ResponsiveContext, Text, Tip } from 'grommet';
import { Logout, Menu as MenuIcon } from 'grommet-icons';
import { signIn, signOut, useSession } from 'next-auth/client';

import { EmojiAvatar } from '@/components/EmojiAvatar';

export function Header() {
  const [session] = useSession();
  const { push } = useRouter();
  const size = useContext(ResponsiveContext);

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn('google');
  };

  const handleGoToHome = () => {
    push('/');
  };

  const handleGoToCalendar = () => {
    push('/calendar');
  };

  const getMenuItems = useCallback(() => {
    const signOutItem = {
      label: (
        <Box pad={{ horizontal: 'large' }}>
          <Text>sair</Text>
        </Box>
      ),
      onClick: handleSignOut,
    };
    const signInItem = {
      label: (
        <Box pad={{ horizontal: 'large' }}>
          <Text>entrar</Text>
        </Box>
      ),
      onClick: handleSignIn,
    };

    let items = [
      {
        label: (
          <Box pad={{ horizontal: 'large' }}>
            <Text>início</Text>
          </Box>
        ),
        onClick: handleGoToHome,
      },
      {
        label: (
          <Box pad={{ horizontal: 'large' }}>
            <Text>calendário</Text>
          </Box>
        ),
        onClick: handleGoToCalendar,
      },
    ];

    if (session) {
      items.push(signOutItem);
    } else {
      items.push(signInItem);
    }

    return items;
  }, [session]);

  return (
    <Box fill direction="row" justify="between" align="center">
      <Box direction="row" gap="medium">
        {session ? <Avatar src={session.user.image!} /> : <EmojiAvatar />}

        {size !== 'small' && (
          <Box direction="row" align="center" gap="medium">
            <Anchor label="início" onClick={handleGoToHome} />

            <Anchor label="calendário" onClick={handleGoToCalendar} />
          </Box>
        )}
      </Box>

      {size === 'small' ? (
        <Menu
          size="large"
          label={
            <Box pad={{ horizontal: 'large' }}>
              <Text color="brand">menu</Text>
            </Box>
          }
          dropAlign={{ top: 'top', right: 'right' }}
          icon={<MenuIcon color="brand" />}
          items={getMenuItems()}
        />
      ) : (
        <>
          {session ? (
            <Tip content="sair">
              <Anchor icon={<Logout />} onClick={handleSignOut} />
            </Tip>
          ) : (
            <Button primary label="entrar" onClick={handleSignIn} style={{ fontWeight: 700 }} />
          )}
        </>
      )}
    </Box>
  );
}
