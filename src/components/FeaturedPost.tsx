import * as React from 'react';
import { Typography, Card, CardActionArea, CardContent, NoSsr } from "@mui/material"
import { Blog } from './types';
import { Image } from './Image';

interface FeaturedPostProps {
  post: Blog.Post
  preload?: boolean;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <CardActionArea component="a" href={Blog.Post.GetPostUrl(post)}>
      <Card sx={{ 
        height: {
          sm: "200px"
        },
        display: {
          xs: "block",
          sm: "flex"
        } 
      }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography component="div" variant="subtitle1" color="text.secondary">
            <NoSsr defer>
              {
                post.dateUpdated ?
                new Date(post.dateUpdated).toLocaleString() :

                post.dateCreated ?
                new Date(post.dateCreated).toLocaleString() :

                null
              }
            </NoSsr>
          </Typography>
          <Typography 
            sx={{
              display: {
                xs: "none",
                sm: "block"
              }
            }}
            component="h3"
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
          <Typography variant='subtitle1' component="h3">
            {post.description}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}