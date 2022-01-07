import * as React from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, ThemeProvider } from "@mui/material"
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material"
import { Theme } from '../src/components/Layout';
import Footer from '../src/components/Footer';
import { User } from '../src/components/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const SignIn: NextPage = function SignIn () {

  const router = useRouter();

  return (
    <Theme>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box 
            component="form" 
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const auth = new User.Auth();
              auth.login = data.get("login") as string;
              auth.password = data.get("password") as string;
              await User.Auth.Login(auth);
              window.location.href = router.query.returnUrl as string || "/";
            }} 
            noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer 
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </Container>
    </Theme>
  );
}

export default SignIn