import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, Fab, ImageList, ImageListItem, Pagination, TextField } from "@mui/material";
import React from "react";
import { Unsplash } from "../../server/unsplash/types";
import qs, { ParsedUrlQuery } from 'querystring';
import { useTheme } from "@mui/material";

interface Props {
  visible: boolean;
  toggle: () => void;
  onSelect: (photo: Unsplash.Photo) => void;
}

const apiRequest = async (term: string, options: ParsedUrlQuery = {}) => {
  const queryString = qs.stringify({
    term,
    ...options
  });
  const res = await fetch("/api/secure/image/search?" + queryString);
  const { data } = await res.json();
  return data as Unsplash.SearchResult;
}

export const SearchImages = (props: Props) => {

  const [ value, setValue ] = React.useState("");

  const [ photos, setPhotos ] = React.useState<Unsplash.SearchResult>({
    total: 0,
    total_pages: 0,
    results: []
  });

  const [ page, setPage ] = React.useState(1);

  const [ loading, setLoading ] = React.useState(false);

  const [ selectedPhoto, setSelectedPhoto ] = React.useState<Unsplash.Photo | null>(null);

  React.useEffect(() => {
    if (props.visible) return;
    setValue("");
    setPhotos({
      total: 0,
      total_pages: 0,
      results: []
    });
    setPage(1);
    setSelectedPhoto(null);
  }, [
    props.visible
  ])

  React.useEffect(() => {
    const timeout = setTimeout(async () => {
      if (value.length < 3) return; 
      setLoading(true)
      const result = await apiRequest(value, {
        page: page.toString()
      });
      setPhotos(result);
      setLoading(false);
    }, 600);
    return () => {
      clearTimeout(timeout);
    }
  }, [
    value,
    page
  ]);

  const theme = useTheme();

  return (
    <Dialog fullScreen open={props.visible} onClose={props.toggle}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DialogContent>
        <TextField 
          sx={{ mb: 1 }}
          variant="standard"
          placeholder="Search photo"
          fullWidth
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        {
          photos.results.length ? null :
          "Not found"
        }
        <ImageList 
          variant="quilted" cols={5} rowHeight={150}>
          {photos.results.map((i) => (
            <ImageListItem 
              sx={i.id === selectedPhoto?.id ? {
                borderStyle: "solid",
                borderColor: theme.palette.primary.main,
                borderRadius: 1
              } : { cursor: "pointer" }}
              onClick={() => {
                setSelectedPhoto(i);
              }}
              key={i.id}>
              <img
                src={i.urls.thumb}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Pagination 
          count={photos.total_pages}
          page={page}
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={props.toggle} 
          color="secondary">
          Cancel
        </Button>
        <Button 
          onClick={() => {
            props.onSelect(selectedPhoto as Unsplash.Photo);
            props.toggle();
          }}
          disabled={!selectedPhoto}
          variant="contained">
          Select
        </Button>
      </DialogActions>
    </Dialog>
  )
}