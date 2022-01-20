import * as React from 'react';
import { Toolbar, Button, Typography, AppBar, Box, Container, Avatar, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react";
import { WebSite } from './types';
import { Add, Login, Logout } from '@mui/icons-material';
import { Image } from './Image';
interface HeaderProps {
}

export default function Header(props: HeaderProps) {
  const { status } = useSession();

  const [ menuAnchor, setMenuAnchor ] = React.useState<HTMLElement | null>(null);

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position='relative' color='transparent'>
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Image
              src={"/mipmap-hdpi/ic_ttn.png"}
              alt={WebSite.Name}
              sx={{
                height: 40,
                width: 40,
                mr: 1
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
    </Box>
  );
}