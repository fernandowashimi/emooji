import { ReactNode, useContext } from 'react';

import { Grid, ResponsiveContext } from 'grommet';

interface ResponsiveGridProps {
  children: ReactNode;
}

const columns: Application.Map<string[]> = {
  small: ['flex'],
  medium: ['flex'],
  large: ['flex'],
  xlarge: ['auto', 'large', 'auto'],
};

const areas: Application.Map<{ name: string; start: number[]; end: number[] }[]> = {
  small: [
    { name: 'header', start: [0, 0], end: [0, 0] },
    { name: 'body', start: [0, 1], end: [0, 1] },
  ],
  medium: [
    { name: 'header', start: [0, 0], end: [0, 0] },
    { name: 'body', start: [0, 1], end: [0, 1] },
  ],
  large: [
    { name: 'header', start: [0, 0], end: [0, 0] },
    { name: 'body', start: [0, 1], end: [0, 1] },
  ],
  xlarge: [
    { name: 'header', start: [1, 0], end: [1, 0] },
    { name: 'body', start: [1, 1], end: [1, 1] },
  ],
};

export function ResponsiveGrid({ children }: ResponsiveGridProps) {
  const size = useContext(ResponsiveContext);

  return (
    <Grid fill gap="large" columns={columns[size]} rows={['auto', 'flex']} areas={areas[size]}>
      {children}
    </Grid>
  );
}
