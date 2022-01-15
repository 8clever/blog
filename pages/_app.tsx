import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/system";
import { theme } from 'src/components/theme';
import { CssBaseline } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
