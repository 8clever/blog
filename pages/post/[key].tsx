import { wrap } from "@mikro-orm/core";
import { Stack, Button, Typography, Card, CardMedia } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { DataBase } from "../../server/connectors";
import { Layout } from "../../src/components/Layout";
import Markdown from "../../src/components/Markdown";
import { Blog } from "../../src/components/types";
import { useSession } from 'next-auth/react';

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
    <Layout>
      {
        status === "authenticated" ?
        <Stack direction={"row"} gap={1} justifyContent={"end"} sx={{ mb: 1 }}>
          <Button variant="contained" href={`/admin/edit-post?key=${props.post.key}`}>
            Edit
          </Button>
        </Stack> : null
      }
      <Stack spacing={3}>
        <Typography component="h1" variant="h4">
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {
            post.dateUpdated ?
            new Date(post.dateUpdated).toLocaleString() :

            post.dateCreated ?
            new Date(post.dateCreated).toLocaleString() :

            null
          }
        </Typography>
        <Typography>
          {post.description}
        </Typography>
        <Card>
          <CardMedia 
            sx={{
              maxHeight: "35vh"
            }}
            component="img"
            image={post.image.url}
            alt={post.image.label}
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