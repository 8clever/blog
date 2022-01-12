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
        height: 300
      }}>
        <CardMedia
          sx={{ height: "100%", width: "100%" }}
          component={"img"}
          image={post.image.url}
          alt={post.image.label}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            p: 3
          }}>
          <Typography component="h2" variant="h3" color="inherit" gutterBottom>
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
        <Box sx={{ 
          position: "absolute", 
          inset: 0, 
          pointerEvents: "none",
          background: "linear-gradient(transparent 50%, black)"
        }} />
      </Card>
    </CardActionArea>
  );
}