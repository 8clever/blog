import * as React from 'react';
import { Toolbar, Button, IconButton, Typography, Link } from "@mui/material"
import { Search as SearchIcon } from '@mui/icons-material';
import { signIn, signOut, useSession } from "next-auth/react";
interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

const rootSections = [
  { title: 'Home', url: '/' },
];

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
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
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
    </React.Fragment>
  );
}