import * as React from 'react';
import { Toolbar, Button, Typography, AppBar, Box, Container, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, InputAdornment, IconButton, Theme, SxProps, Input, FormControl, InputLabel } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react";
import { WebSite } from './types';
import { Add, Login, Logout, Search } from '@mui/icons-material';
import { Image } from './Image';
import { StructuredData } from './StructuredData';
import { useRouter } from 'next/router';

interface SearchInputProps {
  sx?: SxProps<Theme>
  id: string
}

const SearchInput = (props: SearchInputProps) => {
  const router = useRouter();

  return (
    <Box 
      sx={props.sx}
      action='/'
      component="form">
      <FormControl 
        sx={{
          mb: 1
        }}
        variant='standard' 
        color="primary"
        fullWidth>
        <InputLabel 
          htmlFor={props.id}>
          Search
        </InputLabel>
        <Input 
          id={props.id}
          name="q"
          defaultValue={router.query.q}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                color="primary"
                type='submit'
                aria-label="search input">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  )
}

interface HeaderProps {
}

export default function Header(props: HeaderProps) {
  const { status } = useSession();

  const [ menuAnchor, setMenuAnchor ] = React.useState<HTMLElement | null>(null);

  return (
    <>
      <StructuredData 
        thing={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": WebSite.Domain,
          "potentialAction": {
            "@type": "SearchAction",
            "target": WebSite.Domain + "/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <AppBar position='relative' color='transparent' sx={{ mb: 3 }}>
        <Container maxWidth="md">
          <Toolbar sx={{ gap: 1 }} disableGutters>
            <Image
              src={"/mipmap-hdpi/ic_ttn.png"}
              alt={WebSite.Name}
              sx={{
                height: 40,
                width: 40
              }}
            />
            <Typography
              component="a"
              href="/"
              variant="h5"
              color="primary"
              noWrap
              sx={{ flex: 1, textDecoration: "none" }}
            > 
              {WebSite.Name}
            </Typography>
            <SearchInput 
              id='desktop-search-input'
              sx={{
                display: {
                  width: 160,
                  xs: "none",
                  sm: "block"
                }
              }} 
            />
            {
              status === "authenticated" ?
              <>
                <Button
                  onClick={e => setMenuAnchor(e.currentTarget)}
                  color='primary'
                  startIcon={
                    <Avatar 
                      sx={{
                        bgcolor: "primary.main",
                        width: 25,
                        height: 25
                      }}
                      alt="current user" 
                    />
                  }>
                  Admin
                </Button>
                <Menu 
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  anchorEl={menuAnchor}
                  onClose={() => setMenuAnchor(null)}
                  open={Boolean(menuAnchor)}>
                  <MenuItem component="a" href="/admin/edit-post">
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText>
                      Post
                    </ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => signOut()}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText>
                      Sign-out
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </> :
              <Button 
                startIcon={<Login />}
                onClick={() => {
                  signIn();
                }}>
                Sign in
              </Button>
            }
          </Toolbar>
        </Container>
      </AppBar>
      <Container 
        sx={{
          mb: 3,
          display: {
            xs: "block",
            sm: "none"
          }
        }}
        maxWidth="md">
        <SearchInput 
          id="mobile-search-input"
        />
      </Container>
    </>
  );
}