import { ReactNode } from 'react';

import { Box } from 'grommet';

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
      fill
      animation="fadeIn"
      align="center"
      justify="center"
      overflow="auto"
      pad="medium"
      background={{ color: 'background-back' }}
    >
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
        </ResponsiveGrid>
      )}
    </Box>
  );
}
