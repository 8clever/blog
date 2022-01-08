import * as React from 'react';
import { CssBaseline, Container, createTheme, ThemeProvider, Stack, Box } from "@mui/material"
import Header from './Header';
import Footer from './Footer';
import { blue } from '@mui/material/colors';

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
      <Stack justifyContent={"space-between"} sx={{ height: "100vh" }}>
        <Box>
          <Header title="News" />
          <Container maxWidth="lg">
            <main>
              {props.children}
            </main>
          </Container>
        </Box>
        <Box sx={{ background: blue[50] }}>
          <Footer />
        </Box>
      </Stack>
    </Theme>
  );
}