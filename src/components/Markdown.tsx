import * as React from 'react';
import ReactMarkdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { Typography, Link, Box } from "@mui/material";
import { Image } from './Image';

function MarkdownListItem(props: any) {
  return <Box component="li" sx={{ mt: 1, typography: 'body1' }} {...props} />;
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
        component: 'h1',
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6', component: 'h2' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'caption',
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
    img: { 
      component: Image,
      props: {
        width: "100%",
        height: "35vh"
      }
    }
  },
};

interface MarkdownProps {
  children: string;
  options?: MarkdownToJSX.Options
  className?: string;
}

export default function Markdown(props: MarkdownProps) {
  return <ReactMarkdown options={options} {...props} />;
}