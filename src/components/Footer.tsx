import * as React from 'react';
import { Box, Container, Typography, Link, Stack, Fab } from "@mui/material"
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
      <Container maxWidth="xs" sx={{ p: 3 }}>
        <Typography variant="h6" textAlign="center" mb={3}>
          Social
        </Typography>
        <Stack direction="row" gap={3} justifyContent="center">
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
      </ Container> 
      <Copyright />
    </Box>
  );
}