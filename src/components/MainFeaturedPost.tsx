import * as React from 'react';
import { Typography, Box, CardActionArea, CardMedia, Card } from "@mui/material";
import { Blog } from './types';

interface MainFeaturedPostProps {
  post: Blog.Post
}

export default function MainFeaturedPost(props: MainFeaturedPostProps) {
  const { post } = props;

  return (
    <CardActionArea href={Blog.Post.GetPostUrl(post)} component="a">
      <Card sx={{ 
        position: "relative",
        backgroundColor: 'grey.800',
        color: "white",
        maxHeight: 300
      }}>
        <CardMedia
          component={"img"}
          image={post.image.url}
          alt={post.image.label}
        />
        <Box
          sx={{
            background: "rgba(0,0,0,0.5)",
            position: 'absolute',
            inset: 0,
            p: 3
          }}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="inherit">
            {
              post.dateUpdated ?
              new Date(post.dateUpdated).toLocaleString() :

              post.dateCreated ?
              new Date(post.dateCreated).toLocaleString() :

              null
            }
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {post.description}
          </Typography>
        </Box>
      </Card>
    </CardActionArea>
  );
}