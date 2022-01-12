import * as React from 'react';
import { Box, Container, Typography, Link, Stack, Fab } from "@mui/material"
import { Facebook as FacebookIcon, Twitter as TwitterIcon } from "@mui/icons-material"
import { blue } from '@mui/material/colors';

export function Copyright() {
  return (
    <Typography 
      sx={{ p: 1 }}
      variant="body2" 
      color="text.secondary" 
      align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const social = [
  { name: 'Twitter', icon: TwitterIcon },
  { name: 'Facebook', icon: FacebookIcon }
];

const pages = [
  { name: "Term of use", link: "" },
  { name: "Help", link: "" },
  { name: "Etiquette", link: "" },
  { name: "About us", link: "" },
]

export default function Footer() {
  return (
    <Box component="footer" sx={{ background: blue[50] }}>
      <Container maxWidth="xs" sx={{ p: 5 }}>
        <Stack spacing={5}>
          <Stack direction="row" spacing={5} justifyContent="center" flexWrap="wrap">
            {pages.map(p => {
              return (
                <Link href={p.link} key={p.link}>
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
                href={"#"}
                key={network.name}
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