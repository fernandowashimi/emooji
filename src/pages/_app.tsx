import { AppProps } from 'next/app';

import { Provider as AuthProvider } from 'next-auth/client';
import { SWRConfig } from 'swr';

import { ThemeProvider } from '@/providers/ThemeProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider session={pageProps.session}>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>
  );
}
