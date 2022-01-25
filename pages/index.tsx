import { wrap } from '@mikro-orm/core'
import { Pagination, Stack } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { StructuredData } from 'src/components/StructuredData'
import { DataBase } from 'server/connectors'
import FeaturedPost from 'src/components/FeaturedPost'
import { Layout } from 'src/components/Layout'
import { Blog, WebSite } from 'src/components/types'
import { useRouter } from "next/router"
import qs from 'querystring';

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
  q?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, PageQuery> = async (props) => {

  const db = new DataBase();
  await db.init();

  const limit = Number(props.query.limit) || 10;
  const page = Number(props.query.page) || 1;
  const skip = limit * (page - 1);

  const query: any[] = [
    {
      $sort: {
        dateCreated: -1,
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
  ]

  if (props.query.q) {
    const textQuery = {
      $regex: props.query.q,
      $options: "i"
    }
    query.unshift({
      $match: {
        $or: [
          { title: textQuery },
          { description: textQuery },
          { post: textQuery }
        ]
      }
    })
  }
  
  const [ raw ] = await db.em.aggregate(DataBase.Entities.Post, query);

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

const Home: NextPage<PageProps> = (props) => {

  const router = useRouter();

  const title = WebSite.Name + ", top news for the week, top news USA today.";

  const description = WebSite.Name + " is a network about all trend news in the world. Games, popular trends, inside information. All what you want in one place."
  
  return (
    <Layout
      image={props.featuredPosts[0]?.image.url}
      description={description}
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
      <Stack spacing={3}>
        {props.featuredPosts.map((post, idx) => (
          <FeaturedPost key={idx} post={post} />
        ))}
        <Pagination 
          count={props.totalPages}
          page={props.page}
          onChange={(e, page) => {
            const query = {
              ...router.query,
              page
            }
            window.location.href = `/?${qs.stringify(query)}`;
          }}
        />
      </Stack>
    </Layout>
  )
}

export default Home
