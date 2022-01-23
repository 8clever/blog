import { wrap } from "@mikro-orm/core"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material"
import { Image as ImageIcon, YouTube } from "@mui/icons-material"
import { GetServerSideProps, NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import React from "react"
import { DataBase } from "server/connectors"
import { Layout, LayoutHeader } from "src/components/Layout"
import { SearchImages } from "src/components/SearchImages"
import { Blog } from "src/components/types"

interface PageProps {
  post?: Blog.Post
}

interface PageParams extends ParsedUrlQuery {
  key?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, PageParams> = async (props) => {

  if (props.query.key) {
    const db = new DataBase();
    await db.init();
    const repo = db.getRepo(DataBase.Entities.Post);
    const post = await repo.findOne({ key: props.query.key });

    if (post) {
      return {
        props: {
          post: wrap(post).toJSON() as Blog.Post
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

  const [ visibleImageSearchForText, setVisibleImageSearchFormText ] = React.useState(false);

  const [ visibleDeleteConfirmation, setVisibleDeleteConfirmation ] = React.useState(false);

  return (
    <Layout>
      <Stack direction={"column"} spacing={1}>
        <LayoutHeader>
          Edit featured post
        </LayoutHeader>
        <Stack direction="row" gap={1} justifyContent="end">
          <Button 
            variant="contained"
            onClick={async () => {
              await Blog.Post.Save(post);
              if (post.id) return;
              window.location.href = "/admin/edit-post?key=" + post.key
            }}
            color="primary">
            Save
          </Button>
          <Button 
            color="secondary" 
            href="/admin/">
            Cancel
          </Button>
          {
            post.id ?
            <Button 
              onClick={async () => {
                setVisibleDeleteConfirmation(true);
              }}
              color="error">
              Remove
            </Button> : null
          }
          <Dialog open={visibleDeleteConfirmation}>
            <DialogTitle>
              Attention!
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                You are really want to delete post {`"${post.title}"`}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                onClick={() => setVisibleDeleteConfirmation(false)}>
                Cancel
              </Button>
              <Button onClick={async () => {
                await Blog.Post.Delete(post);
                window.location.href = "/admin/";
              }} autoFocus color="error">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
        <TextField
          variant="standard"
          required
          fullWidth
          label="Key"
          value={post.key}
          onChange={e => {
            const key = (e.target.value)
              .trim()
              .toLowerCase()
              .replace(/[^\w-_]/, "");
            setPost({
              ...post,
              key
            })
          }}
        />
        <TextField 
          variant="standard"
          required
          fullWidth
          label={`Title ${post.title.length}`}
          value={post.title}
          onChange={e => {
            setPost({
              ...post,
              title: e.target.value
            })
          }}
        />
        <Button 
          onClick={() => setVisibleImageSearch(true)}>
          Photo: {post.image.label} by {post.image.author}
        </Button>
        <SearchImages 
          visible={visibleImageSearch}
          toggle={() => setVisibleImageSearch(false)}
          onSelect={image => {
            setPost({
              ...post,
              image
            });
          }}
        />
        <TextField 
          variant="standard"
          required
          fullWidth
          type="text"
          label={`Description ${post.description.length}`}
          multiline
          value={post.description}
          onChange={e => {
            setPost({
              ...post,
              description: e.target.value
            })
          }}
        />
        <Stack direction="row" gap={1} justifyContent="end">
          <Button 
            onClick={() => {
              const text = [ 
                post.post, 
                `<YtVideo id="DHvZLI7Db8E" />`
              ]
              setPost({
                ...post,
                post: text.join("\n")
              })
            }}
            size="small">
            <YouTube />
          </Button>
          <Button 
            onClick={() => setVisibleImageSearchFormText(true)}
            size="small">
            <ImageIcon />
          </Button>
          <SearchImages 
              visible={visibleImageSearchForText}
              toggle={() => setVisibleImageSearchFormText(false)}
              onSelect={image => {
                const text = [ 
                  post.post, 
                  `![${image.label}](${image.url})`,
                  "",
                  `*Photo by ${image.author}*`
                ]
                setPost({
                  ...post,
                  post: text.join("\n")
                })
              }}
            />
        </Stack>
        <TextField 
          variant="standard"
          required
          fullWidth
          type="text"
          label="Text (MD)"
          multiline
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