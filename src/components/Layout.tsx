import { ReactNode } from 'react';

import Head from 'next/head';

import { Box, Text } from 'grommet';

import { ResponsiveGrid } from '@/components/ResponsiveGrid';
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { getRandomEmoji } from '@/utils/emojis';

interface LayoutProps {
  children: ReactNode;
  loading?: boolean;
}

export function Layout({ children, loading = false }: LayoutProps) {
  return (
    <Box
      fill="horizontal"
      height={{ min: '100vh' }}
      animation="fadeIn"
      align="center"
      justify="start"
      overflow="auto"
      pad="medium"
      background={{ color: 'background-back' }}
    >
      <Head>
        <title>emooji</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="track your daily mood using emojis" />
        <meta name="keywords" content="emooji, mood tracker, mood, tracker, emoji" />
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${
            getRandomEmoji().value
          }</text></svg>`}
        />
      </Head>

      {loading ? (
        <Loading />
      ) : (
        <ResponsiveGrid>
          <Box fill animation="zoomOut" gridArea="header">
            <Header />
          </Box>

          <Box fill animation="zoomIn" gridArea="body">
            {children}
          </Box>

          <Box fill animation="zoomIn" gridArea="footer">
            <Text color="text-xweak" size="xsmall" alignSelf="center">
              feito com 🤩 por Fernando Shinji.
            </Text>
          </Box>
        </ResponsiveGrid>
      )}
    </Box>
  );
}
