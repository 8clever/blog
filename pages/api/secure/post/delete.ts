import { rootConfig } from "rootConfig";
import { DataBase } from "server/connectors";
import { DeleteEndpoint } from "server/factory/delete"
import { GoogleIndex } from "server/google-index";
import { Blog, WebSite } from "src/components/types";

const deleteEndpoint = new DeleteEndpoint(DataBase.Entities.Post);

deleteEndpoint.after = async (post) => {
  if (rootConfig.NODE_ENV === "development") return;

  const index = new GoogleIndex();
  index.updateUrl(WebSite.Domain + Blog.Post.GetPostUrl(post), "URL_DELETED");
}

export default deleteEndpoint.handler;