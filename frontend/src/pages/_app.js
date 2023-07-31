import { Inter } from 'next/font/google';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from 'src/theme';
import 'simplebar-react/dist/simplebar.min.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import RefreshTokenHandler from '../utils/refreshTokenHandler';
import SplashScreen from '@/components/splashscreen';

const roboto = Inter({
  weight: '400',
  subsets: ['latin'],
});

const env = process.env.NODE_ENV;
if (env === 'production') {
  console.log = () => {};
} else {
}
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = (props) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();
  const [refetchInterval, setRefetchInterval] = useState(0);

  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={refetchInterval}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>Truck Management</title>
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SplashScreen />
            <main className={roboto.className}>
              {getLayout(<Component {...pageProps} />)}
            </main>
          </ThemeProvider>
          <RefreshTokenHandler setRefetchInterval={setRefetchInterval} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
