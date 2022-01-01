import { Grid } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { DataBase } from '../server/connectors'
import { PostEntity } from '../server/entities/Post'
import { data } from '../src/components/data'
import FeaturedPost from '../src/components/FeaturedPost'
import { Layout } from '../src/components/Layout'
import Main from '../src/components/Main'
import MainFeaturedPost from '../src/components/MainFeaturedPost'
import Sidebar from '../src/components/Sidebar'
import { Blog } from '../src/components/types'

interface PageProps {
  mainPost: Blog.Post,
  featuredPosts: Blog.Post[],
  posts: Blog.Post[]
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {

  const db = new DataBase();
  await db.init();
  const postsRepo = db.getRepo<PostEntity>(PostEntity.COLLECTION_NAME);
  const posts = await postsRepo.find({
    
  });

  return {
    props: {
      mainPost: posts[0],
      featuredPosts: posts.slice(1,3),
      posts: posts.slice(3,5)
    }
  }
}

const Home: NextPage<PageProps> = (props) => {
  return (
    <Layout>
      <MainFeaturedPost post={props.mainPost} />
      <Grid container spacing={4}>
        {props.featuredPosts.map((post, idx) => (
          <FeaturedPost key={idx} post={post} />
        ))}
      </Grid>
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Main title="From the firehose" posts={props.posts.map(p => p.post)} />
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
