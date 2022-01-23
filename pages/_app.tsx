import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/system";
import { theme } from 'src/components/theme';
import { CssBaseline } from '@mui/material';
import { LazyHydrate } from 'src/components/LazyHydrate';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LazyHydrate>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </LazyHydrate>
  )
}

export default MyApp
