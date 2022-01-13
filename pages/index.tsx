import { wrap } from '@mikro-orm/core'
import { Box, Pagination, Stack, Typography } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { DataBase } from '../server/connectors'
import FeaturedPost from '../src/components/FeaturedPost'
import { Layout } from '../src/components/Layout'
import { Blog } from '../src/components/types'

interface PageProps {
  mainPost?: Blog.Post;
  featuredPosts: Blog.Post[];
  total: number;
  totalPages: number;
  limit: number;
  page: number; 
}

interface PageQuery extends ParsedUrlQuery {
  page?: string;
  limit?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, PageQuery> = async (props) => {

  const db = new DataBase();
  await db.init();

  const limit = Number(props.query.limit) || 10;
  const page = Number(props.query.page) || 1;
  const skip = limit * (page - 1);
  
  const [ raw ] = await db.em.aggregate(DataBase.Entities.Post, [
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
    },
    {
      $project: {
        key: 1,
        dateUpdated: 1,
        dateCreated: 1,
        title: 1,
        description: 1,
        image: 1
      }
    },
    { 
      $facet: {
        total: [
          { $count: "total" },
          { $addFields: {
            page,
            limit,
            totalPages: {
              $ceil: {
                $divide: [
                  "$total",
                  limit
                ]
              }
            }
          }}
        ],
        data: [ 
          { $skip: skip }, 
          { $limit: limit } 
        ]
      } 
    }
  ]);

  raw.data = raw.data.map((d: Blog.Post) => {
    const post = new DataBase.Entities.Post();
    Object.assign(post, d);
    return wrap(post).toJSON() as Blog.Post;
  });

  const { total: [ total ], data: [ mainPost = null, ...featuredPosts ] } = raw;

  return {
    props: {
      featuredPosts,
      mainPost,
      ...total
    }
  }
}

const Home: NextPage<PageProps> = (props) => {
  return (
    <Layout>
      <Stack spacing={3}>
        <Box>
          <Typography component="h1" variant="h3">
            Breaking news
          </Typography>
        </Box>
        {
          props.mainPost &&
          <FeaturedPost post={props.mainPost} preload />
        }
        {props.featuredPosts.map((post, idx) => (
          <FeaturedPost key={idx} post={post} />
        ))}
        <Pagination 
          count={props.totalPages}
          page={props.page}
          onChange={(e, page) => {
            window.location.href = `/?page=${page}`
          }}
        />
      </Stack>
    </Layout>
  )
}

export default Home
