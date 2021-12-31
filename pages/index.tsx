import { Grid } from '@mui/material'
import type { NextPage } from 'next'
import { data } from '../src/components/data'
import FeaturedPost from '../src/components/FeaturedPost'
import { Layout } from '../src/components/Layout'
import Main from '../src/components/Main'
import MainFeaturedPost from '../src/components/MainFeaturedPost'
import Sidebar from '../src/components/Sidebar'

const Home: NextPage = () => {
  return (
    <Layout>
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
          social={data.sidebar.social}
        />
      </Grid>
    </Layout>
  )
}

export default Home
