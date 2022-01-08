import * as React from 'react';
import { Typography, Card, CardActionArea, CardContent, CardMedia } from "@mui/material"
import { Blog } from './types';

interface FeaturedPostProps {
  post: Blog.Post
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <CardActionArea component="a" href={Blog.Post.GetPostUrl(post)}>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          sx={{ maxWidth: 160 }}
          component="img"
          image={post.image.url}
          alt={post.image.label}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.dateCreated && new Date(post.dateCreated).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.description}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}