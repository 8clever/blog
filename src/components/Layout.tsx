import * as React from 'react';
import { Container, Stack, Box, Typography } from "@mui/material"
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';
import { LazyHydrate } from './LazyHydrate';
interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export function Layout(props: LayoutProps) {
  return (
    <LazyHydrate>
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
            <LazyHydrate>
              <Header title="News" />
            </LazyHydrate>
            <LazyHydrate>
              <Container maxWidth="lg">
                <article>
                  {
                    props.title ?
                    <Typography component="h1" variant="h3" sx={{ mb: 3 }}>
                      {props.title}
                    </Typography>
                    : null
                  }
                  {props.children}
                </article>
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