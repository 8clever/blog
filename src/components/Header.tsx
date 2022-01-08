import * as React from 'react';
import { Toolbar, Button, IconButton, Typography, Link, AppBar, Box, Container } from "@mui/material"
import { Search as SearchIcon } from '@mui/icons-material';
import { signIn, signOut, useSession } from "next-auth/react";
interface HeaderProps {
  title: string;
}

interface RootSection {
  title: string;
  url: string;
}

const rootSections: RootSection[] = [];

export default function Header(props: HeaderProps) {
  const { title } = props;

  const { status } = useSession();

  const sections = React.useMemo(() => {
    if (status === "authenticated") {
      return [
        ...rootSections,
        {
          title: "Admin",
          url: "/admin"
        }
      ]
    }
    return rootSections;
  }, [ status ]);

  return (
    <Box sx={{ mb: 5 }}>
      <AppBar position='relative' color='transparent'>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flex: 1 }}
            > 
              <Link href="/" underline='none'>
                {title}
              </Link>
            </Typography>
            <IconButton>
              <SearchIcon />
            </IconButton>
            {
              status === "authenticated" ?
              <Button 
                onClick={() => {
                  signOut();
                }}
                variant="outlined" 
                size="small">
                Sign out
              </Button> :
              <Button 
                onClick={() => {
                  signIn();
                }}
                variant="outlined" 
                size="small">
                Sign in
              </Button>
            }
          </Toolbar>
        </Container>
      </AppBar>
      {
        sections.length ?
        <Container maxWidth="lg">
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ overflowX: 'auto' }}
          >
            {sections.map((section) => (
              <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                href={section.url}
                sx={{ p: 1, flexShrink: 0 }}
              >
                {section.title}
              </Link>
            ))}
          </Toolbar>
        </Container>
        : null
      }
    </Box>
  );
}