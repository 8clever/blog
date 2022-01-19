import { PlayArrow } from "@mui/icons-material";
import { Button, Card, CardMedia, Box } from "@mui/material";
import React from "react";
import { Image } from "./Image";

interface IProps {
  id: string;
}

const height = {
  xs: "200px",
  sm: "300px",
  md: "400px",
  lg: "500px"
};

export const YtVideo = (props: IProps) => {
  const [ play, setPlay ] = React.useState(false);

  React.useEffect(() => {
    setPlay(false);
  }, [ props.id ]);

  return (
    <>
      {
        play ?
        <CardMedia 
          sx={{ height }}
          component="iframe"
          allowFullScreen
          allow="accelerometer; autoplay; playsinline; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          src={`https://www.youtube.com/embed/${props.id}?autoplay=1&playsinline=1`}
          frameBorder="0"
        /> :
        <Card sx={{ position: "relative", height }}>
          <Image
            sx={{
              height
            }}
            src={`https://i.ytimg.com/vi/${props.id}/maxresdefault.jpg`}
            alt="Youtube Video"
          />
          <Box sx={{ 
            position: "absolute", 
            inset: 0, 
            display: "flex", 
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Button 
              size="large"
              variant="contained"
              onClick={() => setPlay(true)}
              startIcon={<PlayArrow />}>
              Play
            </Button>
          </Box>
        </Card>
      }
    </>
  )
}