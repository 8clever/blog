import { Api } from "../api";

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
    
    dateCreated?: number;
    dateUpdated?: number;
  
    public static GetPostUrl = (post: Post) => {
      return `/post/${post.key}`
    }

    public static Save = async (post: Post) => {
      const api = new Api("/api/featured-post/edit");
      await api.post(post);
    }
  }
}