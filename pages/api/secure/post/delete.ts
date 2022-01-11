import { DataBase } from "../../../../server/connectors";
import { DeleteEndpoint } from "../../../../server/factory/delete"

const deleteEndpoint = new DeleteEndpoint(DataBase.Entities.Post);
export default deleteEndpoint.handler;