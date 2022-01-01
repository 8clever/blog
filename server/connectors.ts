import { Connection, createConnection, EntityTarget } from "typeorm";
import { rootConfig } from "../rootConfig";
import { ImageEntity } from "./entities/Image";
import { PostEntity } from "./entities/Post";
class DataBase {

  connection?: Connection;

  init = async () => {
    this.connection = await createConnection({
      type: "mongodb",
      url: rootConfig.MONGODB_URL,
      database: "blog",
      entities: [
        ImageEntity,
        PostEntity
      ],
      synchronize: true,
      logging: false
    });
  }

  getRepo<Entity> (target: EntityTarget<Entity>) {
    return this.connection!.getMongoRepository(target);
  }
}

export const dataBase = new DataBase()