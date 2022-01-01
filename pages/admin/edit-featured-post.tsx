import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import React from "react"
import { Layout } from "../../src/components/Layout"
import { Blog } from "../../src/components/types"

const EditFeaturedPost = () => {

  const [ post, setPost ] = React.useState<Blog.Post>(new Blog.Post())

  return (
    <Layout>
      <Container maxWidth="sm">
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
      </Container>
    </Layout>
  )
}

export default EditFeaturedPost