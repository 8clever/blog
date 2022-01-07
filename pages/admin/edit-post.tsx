import { wrap } from "@mikro-orm/core"
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import React from "react"
import { DataBase, Post } from "../../server/connectors"
import { Layout } from "../../src/components/Layout"
import { Blog } from "../../src/components/types"

interface PageProps {
  post?: Post
}

interface PageParams extends ParsedUrlQuery {
  key?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, PageParams> = async (props) => {

  if (props.query.key) {
    const db = new DataBase();
    await db.init();
    const repo = db.getRepo(Post);
    const post = await repo.findOne({ key: props.query.key });

    if (post) {
      return {
        props: {
          post: wrap(post).toJSON() as Post
        }
      }
    }
  }

  return {
    props: {

    }
  }
}

const EditFeaturedPost: NextPage<PageProps> = (props) => {

  const [ post, setPost ] = React.useState<Blog.Post>(props.post || new Blog.Post())

  return (
    <Layout>
      <Stack direction={"column"} spacing={1}>
        <Typography variant="h4">
          Edit featured post
        </Typography>
        <Box sx={{ textAlign: "right" }}>
          <Button 
            onClick={() => {
              Blog.Post.Save(post);
            }}
            color="primary">
            Save
          </Button>
          <Button color="secondary" href="/admin/">
            Cancel
          </Button>
        </Box>
        <TextField 
          required
          fullWidth
          label="Ключ"
          value={post.key}
          onChange={e => {
            setPost({
              ...post,
              key: e.target.value
            })
          }}
        />
        <TextField 
          required
          fullWidth
          label="Заголовок"
          value={post.title}
          onChange={e => {
            setPost({
              ...post,
              title: e.target.value
            })
          }}
        />
        <TextField 
          required
          type="url"
          fullWidth
          label="Ссылка на изображение"
          value={post.image.url}
          onChange={e => {
            setPost({
              ...post,
              image: {
                ...post.image,
                url: e.target.value
              }
            })
          }}
        />
        <TextField 
          required
          fullWidth
          label="Текст изображения"
          value={post.image.label}
          onChange={e => {
            setPost({
              ...post,
              image: {
                ...post.image,
                label: e.target.value
              }
            })
          }}
        />
        <TextField 
          required
          fullWidth
          type="text"
          label="Описание"
          multiline
          rows={4}
          value={post.description}
          onChange={e => {
            setPost({
              ...post,
              description: e.target.value
            })
          }}
        />
        <TextField 
          required
          fullWidth
          type="text"
          label="Текст (MD)"
          multiline
          rows={50}
          value={post.post}
          onChange={e => {
            setPost({
              ...post,
              post: e.target.value
            })
          }}
        />
      </Stack>
    </Layout>
  )
}

export default EditFeaturedPost