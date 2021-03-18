import { ChangeEvent, useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { Anchor, Box, Button, Heading, Text } from 'grommet';
import { FormPreviousLink, Save } from 'grommet-icons';
import { signIn, useSession, getSession } from 'next-auth/client';

import { Layout } from '@/components/Layout';
import { EmojiRange } from '@/components/EmojiRange';
import { EmojiDescription } from '@/components/EmojiDescription';
import { getDay } from '@/pages/api/days';
import { createOrUpdateDay } from '@/services/api';
import { getStandardDate } from '@/utils/dates';
import { parseDateParam } from '@/utils/api-parameters';

interface Day {
  id: number;
  date: string;
  emoji: number;
  userEmail: string | null;
}

interface DayProps {
  date?: string;
  day?: Day;
}

export default function Day({ date, day }: DayProps) {
  const [session, loading] = useSession();
  const [mood, setMood] = useState(day?.emoji || 5);
  const [mode, setMode] = useState(day ? 'update' : 'insert');

  const d = date ? new Date(date) : new Date();

  const handleSignIn = () => signIn('google');

  const handleToggleInsert = () => setMode('insert');

  const handleToggleUpdate = () => setMode('update');

  const handleRangeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setMood(Number(value));
  };

  const handleSave = async () => {
    try {
      await createOrUpdateDay({
        date: getStandardDate(d),
        emoji: mood,
      });

      handleToggleUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout loading={loading}>
      <Head>
        <title>{d.toLocaleDateString('pt-BR')} | emooji</title>
      </Head>

      <Box background={{ color: 'background-front' }} round="medium" elevation="small" pad="large">
        <Box>
          <Anchor alignSelf="start" href="/" label="voltar" icon={<FormPreviousLink />} />
        </Box>

        {session ? (
          <Box direction="column" gap="medium" align="center">
            <Box>
              <Heading level="4" textAlign="center">
                📅{' '}
                {new Date(date!).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Heading>
            </Box>

            {mode === 'insert' && (
              <Box width="full" gap="small">
                <Box width="full" gap="small">
                  <Text>como você está se sentindo?</Text>
                  <EmojiRange min={1} max={9} value={mood} onChange={handleRangeInputChange} />
                </Box>
                <Box width="full" direction="row" justify="evenly">
                  <Button primary label="salvar" icon={<Save />} onClick={handleSave} />
                </Box>
              </Box>
            )}

            {mode === 'update' && (
              <Box width="full" gap="small">
                <Text>neste dia você se sentiu:</Text>
                <EmojiDescription editable value={mood} onEdit={handleToggleInsert} />
              </Box>
            )}
          </Box>
        ) : (
          <Text>
            faça o <Anchor label="login" onClick={handleSignIn} /> para continuar.
          </Text>
        )}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const dateString = parseDateParam(context.params?.day);

  return {
    props: {
      date: dateString,
      day: await getDay({ params: { dateString }, session }),
    },
  };
}
