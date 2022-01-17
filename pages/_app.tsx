import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/system";
import { theme } from 'src/components/theme';
import { CssBaseline } from '@mui/material';
import { lazy, LazyHydrate } from 'src/components/LazyHydrate';

lazy(() => {
  if (typeof document === "undefined") return;
  const $script = document.createElement("script");
  $script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7579927697787840";
  $script.crossOrigin = "anonymous"
  document.head.appendChild($script);
});

lazy(() => {
  const id = "G-B4DL20J97K"; 
  if (typeof window === "undefined") return;

  /** @ts-ignore */
  window.dataLayer = window.dataLayer || [];
  /** @ts-ignore */
  function gtag(){dataLayer.push(arguments);}
  /** @ts-ignore */
  gtag('js', new Date());
  /** @ts-ignore */
  gtag('config', id);

  const $script = document.createElement("script");
  $script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.head.appendChild($script);
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
