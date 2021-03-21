import { ReactNode } from 'react';

import Head from 'next/head';

import { Box, Text } from 'grommet';

import { ResponsiveGrid } from '@/components/ResponsiveGrid';
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';

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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
              Feito com 🤩 por Fernando Shinji.
            </Text>
          </Box>
        </ResponsiveGrid>
      )}
    </Box>
  );
}
