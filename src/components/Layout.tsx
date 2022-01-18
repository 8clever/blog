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
}

export function Layout(props: LayoutProps) {

  const router = useRouter();

  return (
    <LazyHydrate>
      <>
        <Head>
          <link rel="canonical" href={WebSite.Domain + router.asPath} />
          {
            props.description ?
            <meta name="description" content={props.description} /> : null
          }
          {
            props.title ?
            <title>{props.title}</title> : null
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