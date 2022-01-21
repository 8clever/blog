import { rootConfig } from "rootConfig";
import { DataBase } from "server/connectors";
import { UpdateEndpoint } from "server/factory/update";
import { GoogleIndex } from "server/google-index";
import { Blog, WebSite } from "src/components/types";

const updateEndpoint = new UpdateEndpoint(DataBase.Entities.Post);

updateEndpoint.validate = async (post) => {
  Blog.Post.Validate(post);
}

updateEndpoint.after = async (post) => {
  if (rootConfig.NODE_ENV === "development") return;

  const index = new GoogleIndex();
  index.updateUrl(WebSite.Domain + Blog.Post.GetPostUrl(post), "URL_UPDATED");
}

export default updateEndpoint.handler;