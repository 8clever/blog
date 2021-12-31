import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Layout } from "../../src/components/Layout";

const adminUrls = [
  {
    title: "Edit featured posts",
    url: "/admin/edit-featured-post"
  }
]

const Admin = () => {
  return (
    <Layout>
      {adminUrls.map(a => {
        return (
          <Card key={a.url} variant="elevation" elevation={3} sx={{ 
            display: "flex", 
            justifyContent: "space-between",
            mb: 1
          }}>
            <CardContent>
              <Typography variant="h6">
                {a.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={a.url}>
                Move
              </Button>
            </CardActions>
          </Card>
        )
      })}
    </Layout>
  )
}

export default Admin;