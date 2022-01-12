import { wrap } from '@mikro-orm/core'
import { Stack, Typography } from '@mui/material'
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
  const [ mainPost, ...featuredPosts ] = (await db.em.aggregate(DataBase.Entities.Post, [
    {
      $addFields: {
        date: {
          $cond: [
            "$dateUpdated",
            "$dateUpdated",
            "$dateCreated"
          ]
        }
      }
    },
    {
      $sort: {
        date: -1,
      }
    }
  ])).map(p => {
    const post = new DataBase.Entities.Post();
    Object.assign(post, p);
    return wrap(post).toJSON() as Blog.Post;
  });

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
      <Stack spacing={3}>
        <Typography component="h1" variant="h2">
          Braking news
        </Typography>
        {
          props.mainPost &&
          <MainFeaturedPost post={props.mainPost} />
        }
        {props.featuredPosts.map((post, idx) => (
          <FeaturedPost key={idx} post={post} />
        ))}
      </Stack>
    </Layout>
  )
}

export default Home
