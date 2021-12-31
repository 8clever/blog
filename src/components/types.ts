
export namespace Blog {

  export class Image {
    url: string = "";
    label: string = "";
  }

  export class FeaturedPost {
    title: string = "";
    description: string = "";
    key: string = '';
    dateCreated: string = new Date().toJSON()
    image: Image = new Image();

    public static GetPostUrl = (post: FeaturedPost) => {
      return `/post/${post.key}`
    }
  }
}