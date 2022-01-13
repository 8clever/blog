import * as React from 'react';
import { CssBaseline, Container, ThemeProvider, Stack, Box, Typography } from "@mui/material"
import Header from './Header';
import Footer from './Footer';
import { theme } from './theme';
import Head from 'next/head';

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
}

export function Layout(props: LayoutProps) {
  return (
    <Theme>
      <Stack justifyContent={"space-between"} sx={{ height: "100vh" }}>
        <Box sx={{ mb: 5 }}>
          <Header title="News" />
          <Container maxWidth="lg">
            <main>
              {
                props.title ?
                <>
                  <Head>
                    <html lang="en" />
                    <title>{props.title}</title>
                  </Head>
                  <Box>
                    <Typography component="h1" variant="h3" sx={{ mb: 3 }}>
                      {props.title}
                    </Typography>
                  </Box>
                </>
                : null
              }
              {props.children}
            </main>
          </Container>
        </Box>
        <Footer />
      </Stack>
    </Theme>
  );
}