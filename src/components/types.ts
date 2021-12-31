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
  }
}