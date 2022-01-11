import { DataBase } from "../../../../server/connectors";
import { UpdateEndpoint } from "../../../../server/factory/update";

const udpateEndpoint = new UpdateEndpoint(DataBase.Entities.Post);
export default udpateEndpoint.handler;