import { wrap } from '@mikro-orm/core'
import { Stack } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { DataBase } from '../server/connectors'
import FeaturedPost from '../src/components/FeaturedPost'
import { Layout } from '../src/components/Layout'
import MainFeaturedPost from '../src/components/MainFeaturedPost'
import { Blog } from '../src/components/types'

interface PageProps {
  mainPost?: Blog.Post,
  featuredPosts: Blog.Post[],
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {

  const db = new DataBase();
  await db.init();
  const postsRepo = db.getRepo(db.entities.Post);
  
  const [ mainPost, ...featuredPosts ] = (await postsRepo.find({}, {
    orderBy: {
      dateUpdated: "ASC_NULLS_LAST",
      dateCreated: "ASC"
    },
    limit: 10
  })).map(p => wrap(p).toJSON() as Blog.Post);

  return {
    props: {
      mainPost,
      featuredPosts,
    }
  }
}

const Home: NextPage<PageProps> = (props) => {
  return (
    <Layout>
      {
        props.mainPost &&
        <MainFeaturedPost post={props.mainPost} withLink />
      }
      <Stack spacing={3} sx={{ mb: 3 }}>
        {props.featuredPosts.map((post, idx) => (
          <FeaturedPost key={idx} post={post} />
        ))}
      </Stack>
    </Layout>
  )
}

export default Home
