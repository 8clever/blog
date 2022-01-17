import { wrap } from '@mikro-orm/core'
import { Pagination, Stack } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { StructuredData } from 'src/components/StructuredData'
import { DataBase } from '../server/connectors'
import FeaturedPost from '../src/components/FeaturedPost'
import { Layout, LayoutHeader } from '../src/components/Layout'
import { Blog, WebSite } from '../src/components/types'

interface PageProps {
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

  const { total: [ total ], data } = raw;

  return {
    props: {
      featuredPosts: data,
      ...total
    }
  }
}

const title = "Breaking News"

const Home: NextPage<PageProps> = (props) => {
  
  return (
    <Layout 
      description={title}
      title={title}>
      <StructuredData 
        thing={{
          "@context":"https://schema.org",
          "@type":"ItemList",
          "itemListElement": props.featuredPosts.map((p,idx) => {
            return {
              "@type":"ListItem",
              "position": idx + 1,
              "url": WebSite.Domain + Blog.Post.GetPostUrl(p)
            }
          })
        }}
      />
      <StructuredData 
        thing={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": WebSite.Domain,
          "potentialAction": {
            "@type": "SearchAction",
            "target": WebSite.Domain + "/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <LayoutHeader>
        {title}
      </LayoutHeader>
      <Stack spacing={3}>
        {props.featuredPosts.map((post, idx) => (
          <FeaturedPost key={idx} post={post} preload={idx === 0} />
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
