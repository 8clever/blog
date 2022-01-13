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
        component="div"
        sx={{ 
          height: {
            xs: "20vh",
            sm: "25vh"
          },
          background: `url(${props.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          ...props.sx
        }}
      />
    </>
  )
}