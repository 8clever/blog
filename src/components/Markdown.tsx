import * as React from 'react';
import ReactMarkdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { Typography, Link, Box } from "@mui/material";
import { Image } from './Image';
import { YtVideo } from "./YtVideo"

function MarkdownListItem(props: any) {
  return <Box component="li" sx={{ mt: 1, typography: 'body1' }} {...props} />;
}

const options: MarkdownToJSX.Options = {
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
      props: { 
        component: "div",
        paragraph: true
      },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
    img: { 
      component: Image,
      props: {
        sx: {
          width: "100%",
          height: "100%"
        }
      }
    },
    YtVideo
  },
};

interface MarkdownProps {
  children: string;
  options?: MarkdownToJSX.Options
  className?: string;
}

export default function Markdown(props: MarkdownProps) {
  return <ReactMarkdown 
    options={options} 
    {...props} />;
}