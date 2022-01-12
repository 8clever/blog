import { CardMedia } from "@mui/material";

interface Props {
  width?: string;
  height?: string;
  src: string;
  alt: string;
}

export const Image = (props: Props) => {
  const { src, alt, ...sx } = props;
  return (
    <CardMedia
      sx={{ 
        width: "25vw",
        height: "25vh",
        borderRadius: 4,
        background: `url(${props.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        ...sx
      }}
      component="div"
      aria-label={alt}
    />
  )
}