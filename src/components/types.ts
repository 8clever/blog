export namespace Blog {
  export class Image {
    url: string = "https://source.unsplash.com/random";
    label: string = "Random";
    author: string = "Unsplash";
  }

  export class Post {
    id?: string;
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
      const Api = (await import("src/api")).Api;
      const api = new Api("/api/secure/post/update");
      await api.post(post);
    }

    public static Delete = async (post: Post) => {
      const Api = (await import("src/api")).Api;
      const api = new Api("/api/secure/post/delete");
      await api.post(post);
    }

    public static Validate = (post: Post) => {
      if (post.title.length < Config.Title.Min || post.title.length > Config.Title.Max) {
        throw new Error(`Invalid legth of title. Min: ${Config.Title.Min}, Max: ${Config.Title.Max}, Current: ${post.title.length}`)
      }
      if (post.description.length < Config.Description.Min || post.description.length > Config.Description.Max) {
        throw new Error(`Invalid legth of description. Min: ${Config.Description.Min}, Max: ${Config.Description.Max}, Current: ${post.description.length}`)
      }
    }
  }

  export namespace Config {
    export class Title {
      public static Min = 50
      public static Max = 70
    }
    export class Description {
      public static Min = 110;
      public static Max = 160;
    }
  }
}

export namespace User {

  export class Auth {
    login: string = ""
    password?: string;
  }

}

export class WebSite {
  public static Domain = "https://taketopnews.com"

  public static Name = "Take Top News"
}