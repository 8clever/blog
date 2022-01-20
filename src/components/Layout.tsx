import * as React from 'react';
import { Container, Stack, Box, Typography } from "@mui/material"
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import { lazy, LazyHydrate } from './LazyHydrate';
import { useRouter } from 'next/router';
import { WebSite } from './types';

interface LayoutHeaderProps {
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = function LayoutHeader (props) {
  return (
    <Typography
      component="h1" 
      variant="h3" 
      sx={{ mb: 3 }}>
      {props.children}
    </Typography>
  )
}

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  ad?: boolean;
}

export function Layout(props: LayoutProps) {

  const router = useRouter();

  React.useEffect(() => {
    if (!props.ad) return;
    
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
  }, [ props.ad ]);

  return (
    <LazyHydrate>
      <>
        <Head>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@TakeTopNews" />
          <meta name="twitter:creator" content="@godofluck89" />
          <meta property="og:url" content={WebSite.Domain + router.asPath} />
          <meta property="og:type" content="website" />
          <link rel="canonical" href={WebSite.Domain + router.asPath} />
          {
            props.image ?
            <meta property="og:image" content={props.image} /> : null
          }
          {
            props.description ?
            <>
              <meta name="description" content={props.description} />
              <meta property="og:description" content={props.description} />
            </>
            : null
          }
          {
            props.title ?
            <>
              <title>{props.title}</title>
              <meta property="og:title" content={props.title} />
            </> : null
          }
        </Head>
        <Stack justifyContent={"space-between"} sx={{ height: "100vh" }}>
          <Box sx={{ mb: 5 }}>
            <LazyHydrate>
              <Header />
            </LazyHydrate>
            <LazyHydrate>
              <Container maxWidth={"md"}>
                {props.children}
              </Container>
            </LazyHydrate>
          </Box>
          <LazyHydrate>
            <Footer />
          </LazyHydrate>
        </Stack>
      </>
    </LazyHydrate>
  );
}