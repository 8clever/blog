import * as React from 'react';
import { Typography, Card, CardActionArea, CardContent } from "@mui/material"
import { Blog } from './types';
import { Image } from './Image';
import { PostTime } from './PostTime';

interface FeaturedPostProps {
  post: Blog.Post
  preload?: boolean;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <CardActionArea component="a" href={Blog.Post.GetPostUrl(post)}>
      <Card component="article" sx={{ 
          height: {
            sm: "200px"
          },
          display: {
            xs: "block",
            sm: "flex"
          } 
        }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5">
            {post.title}
          </Typography>
          <Typography
            component="time" 
            variant="subtitle1" 
            color="text.secondary">
            <PostTime post={post} />
          </Typography>
          <Typography 
            sx={{
              display: {
                xs: "none",
                sm: "block"
              }
            }}
            component="p"
            variant='subtitle1' 
            paragraph>
            {post.description}
          </Typography>
        </CardContent>
        <Image 
          preload={props.preload}
          sx={{
            order: -1,
            width: {
              sm: "200px"
            },
            height: {
              xs: "150px",
              sm: "100%"
            }
          }}
          src={post.image.url} alt={post.image.label} 
        />
        <CardContent sx={{
          display: {
            xs: "block",
            sm: "none"
          }
        }}>
          <Typography variant='subtitle1' component="p">
            {post.description}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}