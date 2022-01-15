import { NoSsr } from "@mui/material"
import { Blog } from "./types"

interface Props {
  post: Blog.Post
}

export const PostTime = (props: Props) => {
  const { post } = props;

  const date = new Date(post.dateUpdated || post.dateCreated || new Date());

  return (
    <NoSsr defer fallback={<>&nbsp;</>}>
      {date.toLocaleDateString()} {date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric"
      })}
    </NoSsr>
  )
}