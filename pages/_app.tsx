import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/system";
import { theme } from 'src/components/theme';
import { CssBaseline } from '@mui/material';
import { lazy, LazyHydrate } from 'src/components/LazyHydrate';

lazy(() => {
  const script = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7579927697787840" crossorigin="anonymous"></script>`;
  if (typeof document === "undefined") return;
  document.head.insertAdjacentHTML("beforeend", script);
});

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
