import * as React from 'react';
import { CssBaseline, Container, Stack, Box, Typography } from "@mui/material"
import { ThemeProvider } from "@mui/system";
import Header from './Header';
import Footer from './Footer';
import { theme } from './theme';
import Head from 'next/head';
import LazyHydrate from 'react-lazy-hydration';

export const Theme: React.FC = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}
interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export function Layout(props: LayoutProps) {
  return (
    <LazyHydrate whenIdle>
      <Theme>
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
      </Theme>
    </LazyHydrate>
  );
}