import { useCallback, useContext } from 'react';

import { useRouter } from 'next/router';

import { Anchor, Avatar, Button, Box, Menu, ResponsiveContext, Text } from 'grommet';
import { Configure, Logout, Menu as MenuIcon } from 'grommet-icons';
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

  const handleGoToCharts = () => {
    push('/charts');
  };

  const handleGoToSettings = () => {
    push('/settings');
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
            <Text>gráficos</Text>
          </Box>
        ),
        onClick: handleGoToCharts,
      },
      {
        label: (
          <Box pad={{ horizontal: 'large' }}>
            <Text>configurações</Text>
          </Box>
        ),
        onClick: handleGoToSettings,
      },
    ];

    items.push(session ? signOutItem : signInItem);

    return items;
  }, [session]);

  return (
    <Box fill direction="row" justify="between" align="center">
      <Box direction="row" gap="medium">
        {session ? <Avatar src={session.user.image!} /> : <EmojiAvatar />}

        {size !== 'small' && (
          <Box direction="row" align="center" gap="medium">
            <Anchor label="início" onClick={handleGoToHome} />

            <Anchor label="gráficos" onClick={handleGoToCharts} />
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
        <Box direction="row" align="center">
          <Button
            tip="configurações"
            icon={<Configure color="brand" />}
            onClick={handleGoToSettings}
          />
          {session ? (
            <Button tip="sair" icon={<Logout color="brand" />} onClick={handleSignOut} />
          ) : (
            <Button primary label="entrar" onClick={handleSignIn} style={{ fontWeight: 700 }} />
          )}
        </Box>
      )}
    </Box>
  );
}
