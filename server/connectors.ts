import { Connection, createConnection, EntityTarget, getConnection } from "typeorm";
import { rootConfig } from "../rootConfig";
import { ImageEntity } from "./entities/Image";
import { PostEntity } from "./entities/Post";
export class DataBase {

  connection?: Connection;

  init = async () => {
    if (this.connection) return;

    try {
      this.connection = getConnection();
      return;
    } catch {}

    this.connection = await createConnection({
      type: "mongodb",
      url: rootConfig.MONGODB_URL,
      database: "blog",
      logging: true,
      synchronize: true,
      entities: [
        PostEntity,
        ImageEntity
      ]
    });
  }

  getRepo<Entity> (target: EntityTarget<Entity>) {
    return this.connection!.getRepository(target);
  }
}