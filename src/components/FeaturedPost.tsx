import * as React from 'react';
import { Typography, Card, CardActionArea, CardContent, Box } from "@mui/material"
import { Blog } from './types';
import { Image } from './Image';

interface FeaturedPostProps {
  post: Blog.Post
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <CardActionArea component="a" href={Blog.Post.GetPostUrl(post)}>
      <Card sx={{ display: 'flex', position: "relative", height: "25vh" }}>
        <Image src={post.image.url} alt={post.image.label} />
        <CardContent sx={{ flex: 1, position: "relative" }}>
          <Typography component="h2" variant="h5">
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
          <Typography variant="subtitle1" paragraph>
            {post.description}
          </Typography>
          <Box sx={{ 
            position: "absolute", 
            inset: 0, 
            pointerEvents: "none",
            background: "linear-gradient(transparent 50%, white)"
          }} />
        </CardContent>
      </Card>
    </CardActionArea>
  );
}