import { AppProps } from 'next/app';

import { Grommet } from 'grommet';
import { Provider } from 'next-auth/client';

import { theme } from '@/shared/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grommet full theme={theme}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </Grommet>
  );
}
