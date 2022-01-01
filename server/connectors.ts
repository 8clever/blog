import { createConnection, getConnection } from "typeorm";
import { rootConfig } from "../rootConfig";
import { ImageEntity } from "./entities/Image";
import { PostEntity } from "./entities/Post";

createConnection({
  type: "mongodb",
  url: rootConfig.MONGODB_URL,
  database: "blog",
  entities: [
    PostEntity,
    ImageEntity
  ],
  synchronize: true,
  logging: false
});

export { getConnection }