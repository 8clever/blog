import * as React from 'react';
import { Box, Container, Typography, Link, Stack, Fab } from "@mui/material"
import { Twitter as TwitterIcon } from "@mui/icons-material"
import { darken } from "@mui/system/colorManipulator";
import { theme } from './theme';
import { WebSite } from './types';

export function Copyright() {
  return (
    <Typography 
      sx={{ p: 1 }}
      variant="body2" 
      color={theme.palette.secondary.contrastText}
      align="center">
      {'Copyright © '}
      <Link color="inherit" href={WebSite.Domain}>
        {WebSite.Name}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const social = [
  { name: 'Twitter', icon: TwitterIcon, url: "https://twitter.com/taketopnews" }
];

const pages = [
  { name: "Privacy Policy", url: "/privacypolicy" }
]

const footerBackground = darken(theme.palette.secondary.main, 0.5);

export default function Footer() {
  return (
    <Box component="footer" sx={{ background: footerBackground }}>
      <Container maxWidth="xs" sx={{ p: 5 }}>
        <Stack spacing={5}>
          <Stack direction="row" spacing={5} justifyContent="center" flexWrap="wrap">
            {pages.map(p => {
              return (
                <Link 
                  color={theme.palette.secondary.contrastText}
                  href={p.url} 
                  key={p.name} 
                  underline='none'>
                  {p.name}
                </Link>
              )
            })}
          </Stack>
          <Stack direction="row" gap={5} justifyContent="center">
            {social.map((network) => (
              <Fab
                size="small"
                color="primary"
                href={network.url}
                key={network.name}
                title={network.name}
              >
                <network.icon />
              </Fab>
            ))}
          </Stack>
          <Copyright />
        </Stack>
      </ Container> 
    </Box>
  );
}