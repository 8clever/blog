import { wrap } from "@mikro-orm/core";
import { Stack, Button, Typography, Card } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { DataBase } from "server/connectors";
import { Layout, LayoutHeader } from "src/components/Layout";
import Markdown from "src/components/Markdown";
import { Blog, WebSite } from "src/components/types";
import { useSession } from 'next-auth/react';
import { Image } from "src/components/Image";
import { PostTime } from "src/components/PostTime";
import { StructuredData } from "src/components/StructuredData";

interface PageProps {
  post: Blog.Post
}

interface PageParams extends ParsedUrlQuery {
  key: string
}

export const getServerSideProps: GetServerSideProps<PageProps, PageParams> = async (props) => {

  const db = new DataBase();
  await db.init();

  const repo = db.getRepo(DataBase.Entities.Post);
  const post = await repo.findOne({ key: props.params?.key });

  return {
    props: {
      post: wrap(post).toJSON() as Blog.Post
    }
  }
}

const PostPage: NextPage<PageProps> = (props) => {

  const { status } = useSession();

  const { post } = props;

  return (
    <Layout
      image={post.image.url}
      description={post.description}
      title={post.title}>
      <StructuredData thing={{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": post.title,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": WebSite.Domain + Blog.Post.GetPostUrl(post)
        },
        "image": [
          post.image.url
        ],
        "datePublished": post.dateCreated ? new Date(post.dateCreated).toJSON() : undefined,
        "dateModified": post.dateUpdated ? new Date(post.dateUpdated).toJSON() : undefined,
        "publisher": {
          "@type": "Organization",
          "name": WebSite.Name,
          "logo": {
            "@type": "ImageObject",
            "url": WebSite.Domain + "/favicon.ico"
          }
        },
        "author": {
          "@type": "Person",
          "name": WebSite.Name,
          "url": WebSite.Domain
        }
      }} />
      <LayoutHeader>{post.title}</LayoutHeader>
      {
        status === "authenticated" ?
        <Stack direction={"row"} gap={1} justifyContent={"end"} sx={{ mb: 1 }}>
          <Button variant="contained" href={`/admin/edit-post?key=${props.post.key}`}>
            Edit
          </Button>
        </Stack> : null
      }
      <Stack spacing={3}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          <PostTime post={post} />
        </Typography>
        <Card>
          <Image 
            src={post.image.url} 
            alt={post.image.label} 
            preload 
          />
        </Card>
        <Markdown className="markdown">
          {props.post.post}
        </Markdown>
      </Stack>
    </Layout>
  )
}

export default PostPage;