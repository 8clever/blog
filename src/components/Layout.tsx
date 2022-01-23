import * as React from 'react';
import { Container, Stack, Box, Typography, SxProps, Theme } from "@mui/material"
import Header, { SearchInput } from './Header';
import Footer from './Footer';
import Head from 'next/head';
import { lazy, LazyHydrate } from './LazyHydrate';
import { useRouter } from 'next/router';
import { WebSite } from './types';

interface LayoutHeaderProps {
  sx?: SxProps<Theme>
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = function LayoutHeader (props) {
  return (
    <Typography
      component="h1" 
      variant="h4" 
      sx={{ 
        fontWeight: "bold",
        mb: 3,
        ...props.sx 
      }}>
      {props.children}
    </Typography>
  )
}

interface LayoutContainer {
  sx?: SxProps<Theme>
}

export const LayoutContainer: React.FC<LayoutContainer> = function LayoutContainer (props) {
  return (
    <Container maxWidth="md" sx={props.sx}>{props.children}</Container>
  )
}

const shapeStyles = { bgcolor: 'primary.contrastText', width: 5, height: 5 };
const rectangle = <Box component="span" sx={shapeStyles} />;

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
          <Box>
            <LazyHydrate>
              <Header />
            </LazyHydrate>
            <LazyHydrate>
              <>
                { props.title && props.description ?
                  <Box sx={{ 
                    px: {
                      xs: 2,
                      sm: 10,
                      md: 20,
                      lg: 30
                    },
                    py: {
                      xs: 15,
                      sm: 20
                    },
                    textAlign: "center",
                    bgcolor: "primary.dark", 
                    mb: 3
                  }}>
                    <LayoutHeader sx={{ color: "secondary.contrastText" }}>
                      {props.title}
                    </LayoutHeader>
                    <Stack direction={"row"} spacing={3} justifyContent="center" sx={{ mb: 2 }}>
                      {rectangle}
                    </Stack>
                    <Typography component="p" color="secondary.contrastText">
                      {props.description}
                    </Typography>
                  </Box> : 
                  <Box sx={{ mb: 3 }} />
                }
                <LayoutContainer 
                  sx={{
                    mb: 3,
                    display: {
                      xs: "block",
                      sm: "none"
                    }
                  }}>
                  <SearchInput 
                    id="mobile-search-input"
                  />
                </LayoutContainer>
                <LayoutContainer sx={{ mb: 5 }}>
                  {props.children}
                </LayoutContainer>
              </>
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