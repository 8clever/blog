import { DataBase } from "server/connectors";
import { UpdateEndpoint } from "server/factory/update";
import { Blog } from "src/components/types";

const updateEndpoint = new UpdateEndpoint(DataBase.Entities.Post);

updateEndpoint.validate = async (post) => {
  Blog.Post.Validate(post);
}

export default updateEndpoint.handler;