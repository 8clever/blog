import * as React from 'react';
import { Container, Stack, Box, Typography } from "@mui/material"
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import LazyHydrate from 'react-lazy-hydration';
interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export function Layout(props: LayoutProps) {
  return (
    <LazyHydrate on="mousemove">
      <>
        <Head>
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
            <Header title="News" />
            <Container maxWidth="lg">
              <main>
                {
                  props.title ?
                  <Typography component="h1" variant="h3" sx={{ mb: 3 }}>
                    {props.title}
                  </Typography>
                  : null
                }
                {props.children}
              </main>
            </Container>
          </Box>
          <Footer />
        </Stack>
      </>
    </LazyHydrate>
  );
}