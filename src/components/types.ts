export namespace Blog {
  export class Image {
    url: string = "";
    label: string = "";
  }

  export class FeaturedPost {
    key: string = '';
    title: string = "";
    description: string = "";
    post: string = "";
    dateCreated: string = new Date().toJSON()
    image = new Image();
  
    public static GetPostUrl = (post: FeaturedPost) => {
      return `/post/${post.key}`
    }

    public static Save = async (post: FeaturedPost) => {
      const res = await fetch("/api/featured-post/edit", {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(post)
      });
      return res.json();
    }
  }
}