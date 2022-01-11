import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, ImageList, ImageListItem, Pagination, Tab, Tabs, TextField } from "@mui/material";
import React from "react";
import { Unsplash } from "../../server/unsplash/types";
import qs, { ParsedUrlQuery } from 'querystring';
import { useTheme } from "@mui/material";
import { Blog } from "./types";

interface Props {
  visible: boolean;
  toggle: () => void;
  onSelect: (img: Blog.Image) => void;
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

enum TabName {
  Unsplash = "unsplash",
  CustomLink = 'custom-link'
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

  const [ tab, setTab ] = React.useState<TabName>(TabName.CustomLink);

  const [ image, setImage ] = React.useState(new Blog.Image());

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
    setImage(new Blog.Image());
    setTab(TabName.CustomLink);
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
        <Tabs 
          sx={{ mb: 1 }}
          value={tab} 
          onChange={(e, v: TabName) => setTab(v)}>
          <Tab label="Custom Link" value={TabName.CustomLink} />
          <Tab label="Unsplash" value={TabName.Unsplash} />
        </Tabs>
        {
          tab === TabName.CustomLink ?
          <>
            <TextField 
              sx={{ mb: 1 }}
              label="Url"
              placeholder="Url"
              fullWidth
              value={image.url}
              onChange={e => setImage({
                ...image,
                url: e.target.value
              })}
            />
            <TextField 
              sx={{ mb: 1 }}
              label="Label"
              placeholder="Label"
              fullWidth
              value={image.label}
              onChange={e => setImage({
                ...image,
                label: e.target.value
              })}
            />
            <TextField 
              sx={{ mb: 1 }}
              label="Author"
              placeholder="Author"
              fullWidth
              value={image.author}
              onChange={e => setImage({
                ...image,
                author: image.author
              })}
            />
          </> :

          tab === TabName.Unsplash ?
          <>
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
          </>
          : null
        }
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={props.toggle} 
          color="secondary">
          Cancel
        </Button>
        <Button 
          onClick={() => {
            if (tab === TabName.CustomLink) {
              props.onSelect(image);
              props.toggle();
              return;
            }

            if (tab === TabName.Unsplash && selectedPhoto) {
              const img = new Blog.Image();
              img.author = selectedPhoto.user.name;
              img.url = selectedPhoto.urls.regular;
              img.label = selectedPhoto.alt_description;
              props.onSelect(img);
              props.toggle();
            }
          }}
          variant="contained">
          Select
        </Button>
      </DialogActions>
    </Dialog>
  )
}