import * as React from 'react';
import { Box, Typography, Divider } from "@mui/material"
import Markdown from './Markdown';

interface MainProps {
  posts: ReadonlyArray<string>;
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;

  return (
    <Box
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post, idx) => (
        <Markdown className="markdown" key={idx}>
          {post}
        </Markdown>
      ))}
    </Box>
  );
}