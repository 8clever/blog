import * as React from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Alert } from "@mui/material"
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material"
import { Theme } from '../src/components/Layout';
import { GetServerSideProps, NextPage } from 'next';
import { getCsrfToken } from "next-auth/react"
import { useRouter } from 'next/router';
import { Copyright } from '../src/components/Footer';

export const getServerSideProps: GetServerSideProps<NextProps> =  async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

interface NextProps {
  csrfToken?: string
}

const SignIn: NextPage<NextProps> = function SignIn (props) {

  const router = useRouter();

  return (
    <Theme>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mb: 5,
            mt: 5,
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
          {
            router.query.error &&
            <Alert severity='error' sx={{ width: "100%", mt: 1 }}>
              Login or password is not correct
            </Alert>
          }
          <Box 
            method="post"
            action="/api/auth/callback/credentials"
            component="form" 
            noValidate 
            sx={{ mt: 1 }}>
            <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Login"
              name="username"
              autoComplete="username"
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
        <Copyright />
      </Container>
    </Theme>
  );
}

export default SignIn