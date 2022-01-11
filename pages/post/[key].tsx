import { wrap } from "@mikro-orm/core";
import { Divider, Stack, Button } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { DataBase } from "../../server/connectors";
import { Layout } from "../../src/components/Layout";
import MainFeaturedPost from "../../src/components/MainFeaturedPost";
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
      <MainFeaturedPost 
        post={props.post}
      />
      <Divider />
      <Markdown className="markdown">
        {props.post.post}
      </Markdown>
    </Layout>
  )
}

export default PostPage;