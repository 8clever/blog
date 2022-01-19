import { CardMedia, SxProps } from "@mui/material";
import Head from "next/head";

interface Props {
  src: string;
  alt: string;
  sx?: SxProps;
  preload?: boolean;
}

export const Image = (props: Props) => {
  return (
    <>
      {
        props.preload ?
        <Head>
          <link rel="preload" as="image" href={props.src} />
        </Head> : null
      }
      <CardMedia
        component="img"
        src={props.src}
        alt={props.alt}
        loading={
          props.preload ?
          "eager" :
          "lazy"
        }
        sx={{ 
          height: {
            xs: "200px",
            sm: "250px",
            md: "300px"
          },
          ...props.sx
        }}
      />
    </>
  )
}