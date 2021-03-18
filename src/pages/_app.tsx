import { AppProps } from 'next/app';

import { Grommet } from 'grommet';
import { Provider } from 'next-auth/client';
import { SWRConfig } from 'swr';

import { theme } from '@/shared/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grommet full theme={theme}>
      <Provider session={pageProps.session}>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </Provider>
    </Grommet>
  );
}
