
export namespace Blog {

  export interface Image {
    url: string;
    label: string;
  }

  export class FeaturedPost {
    title: string = "";
    description: string = "";
    key: string = '';
    dateCreated: string = new Date().toJSON()
    image: Image = {
      url: "",
      label: ""
    }

    public static GetPostUrl = (post: FeaturedPost) => {
      return `/post/${post.key}`
    }
  }
}