import * as React from 'react';
import { CssBaseline, Container, createTheme, ThemeProvider } from "@mui/material"
import Header from './Header';
import Footer from './Footer';
import { data } from "./data";

const theme = createTheme();

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
}

export function Layout(props: LayoutProps) {
  return (
    <Theme>
      <Container maxWidth="lg">
        <Header title="News" />
        <main>
          {props.children}
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </Theme>
  );
}