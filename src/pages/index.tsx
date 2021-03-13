import { ChangeEvent, useState } from 'react';

import { signIn, useSession } from 'next-auth/client';

import { Anchor, Box, Button, Heading, Text } from 'grommet';
import { Save } from 'grommet-icons';

import { Layout } from '@/components/Layout';
import { EmojiRange } from '@/components/EmojiRange';

interface MoodState {
  value: number;
  emoji: string | null;
}

export default function Home() {
  const [session, loading] = useSession();
  const [mood, setMood] = useState<MoodState>({ value: 5, emoji: null });

  const handleSignIn = () => {
    signIn('google');
  };

  const handleRangeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setMood((prev) => ({
      ...prev,
      value: Number(value),
    }));
  };

  return (
    <Layout loading={loading}>
      <Box background={{ color: 'background-front' }} round="medium" elevation="small" pad="large">
        {session ? (
          <Box direction="column" gap="medium" align="center">
            <Box>
              <Heading level="4" textAlign="center">
                📅{' '}
                {new Date().toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Heading>
            </Box>

            <Box width="full" gap="small">
              <Text>Como você esta se sentindo hoje?</Text>
              <EmojiRange min={1} max={9} value={mood.value} onChange={handleRangeInputChange} />
            </Box>

            <Box>
              <Button primary fill="horizontal" label="Salvar" icon={<Save />} />
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
