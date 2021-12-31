import * as React from 'react';
import { CssBaseline, Container, createTheme, ThemeProvider } from "@mui/material"
import Header from './Header';
import Footer from './Footer';
import { data } from "./data";

const theme = createTheme();

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={data.sections} />
        <main>
          {props.children}
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}