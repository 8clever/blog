export namespace Blog {
  export class Image {
    url: string = "https://source.unsplash.com/random";
    label: string = "Test image";
  }

  export class Post {
    key: string = "test_key";
    title: string = "Test post";
    description: string = "Test post";
    post: string = "### Test post";
    image: Image = new Image();
    
    dateCreated?: string;
    dateUpdated?: string;
  
    public static GetPostUrl = (post: Post) => {
      return `/post/${post.key}`
    }

    public static Save = async (post: Post) => {
      const res = await fetch("/api/featured-post/edit", {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(post)
      });
      return res.json();
    }
  }
}