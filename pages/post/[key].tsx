import { wrap } from "@mikro-orm/core";
import { Divider } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { DataBase, Post } from "../../server/connectors";
import { Layout } from "../../src/components/Layout";
import MainFeaturedPost from "../../src/components/MainFeaturedPost";
import Markdown from "../../src/components/Markdown";
import { Blog } from "../../src/components/types";

interface PageProps {
  post: Blog.Post
}

interface PageParams extends ParsedUrlQuery {
  key: string
}

export const getServerSideProps: GetServerSideProps<PageProps, PageParams> = async (props) => {

  const db = new DataBase();
  await db.init();

  const repo = db.getRepo(Post);
  const post = await repo.findOne({ key: props.params?.key });

  return {
    props: {
      post: wrap(post).toJSON() as Post
    }
  }
}

const PostPage: NextPage<PageProps> = (props) => {
  return (
    <Layout>
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