import * as React from 'react';
import { CssBaseline, Grid, Container, createTheme, ThemeProvider } from "@mui/material"
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { data } from "./data";

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={data.sections} />
        <main>
          <MainFeaturedPost post={data.mainFeaturedPost} />
          <Grid container spacing={4}>
            {data.featuredPosts.map((post, idx) => (
              <FeaturedPost key={idx} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={data.posts} />
            <Sidebar
              title={data.sidebar.title}
              description={data.sidebar.description}
              archives={data.sidebar.archives}
              social={data.sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}