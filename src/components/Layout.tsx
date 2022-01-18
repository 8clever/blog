import * as React from 'react';
import { Container, Stack, Box, Typography } from "@mui/material"
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import { LazyHydrate } from './LazyHydrate';
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
}

export function Layout(props: LayoutProps) {

  const router = useRouter();

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
              <Container maxWidth="lg">
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