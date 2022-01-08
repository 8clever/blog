import { wrap } from "@mikro-orm/core"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { GetServerSideProps, NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import React from "react"
import { DataBase, Post } from "../../server/connectors"
import { Layout } from "../../src/components/Layout"
import { SearchImages } from "../../src/components/SearchImages"
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

  const [ post, setPost ] = React.useState<Blog.Post>(props.post || new Blog.Post());

  const [ visibleImageSearch, setVisibleImageSearch ] = React.useState(false);

  return (
    <Layout>
      <Stack direction={"column"} spacing={1}>
        <Typography variant="h4">
          Edit featured post
        </Typography>
        <Box sx={{ textAlign: "right" }}>
          <Button 
            sx={{ mr: 1 }}
            variant="contained"
            onClick={() => {
              Blog.Post.Save(post);
            }}
            color="primary">
            Save
          </Button>
          <Button 
            color="secondary" 
            href="/admin/">
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
        <Button 
          variant="outlined"
          onClick={() => setVisibleImageSearch(true)}>
          Photo: {post.image.url}
        </Button>
        <SearchImages 
          visible={visibleImageSearch}
          toggle={() => setVisibleImageSearch(false)}
          onSelect={photo => {

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