import * as React from 'react';
import { Box, Container, Typography, Link, Stack } from "@mui/material"
import { GitHub as GitHubIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from "@mui/icons-material"

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
  { name: 'GitHub', icon: GitHubIcon },
  { name: 'Twitter', icon: TwitterIcon },
  { name: 'Facebook', icon: FacebookIcon }
];

interface FooterProps {
}

export default function Footer(props: FooterProps) {
  return (
    <Box component="footer">
      <Container maxWidth="xs" sx={{ p: 5 }}>
        <Typography variant="h6">
          Social
        </Typography>
        {social.map((network) => (
          <Link
            display="block"
            variant="body1"
            href="#"
            key={network.name}
            sx={{ mb: 0.5 }}
          >
            <Stack direction="row" spacing={1}>
              <network.icon />
              <span>{network.name}</span>
            </Stack>
          </Link>
        ))}
      </ Container> 
      <Copyright />
    </Box>
  );
}