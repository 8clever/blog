import { ThemeProvider } from "@emotion/react";
import { Menu } from "@mui/icons-material"
import { AppBar, Button, IconButton, Toolbar, Typography, createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#f5f5f5',
    },
  },
  shape: {
    borderRadius: 0,
  },
})

export const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}