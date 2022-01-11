import { MikroORM, EntityName } from "@mikro-orm/core";
import { rootConfig } from "../rootConfig";
import { Image } from "./entities/Image";
import { Post } from "./entities/Post";

const entities = {
  Post,
  Image
}

function getGlobal (): { 
  __ORM__: MikroORM
  __ENTITIES__: typeof entities
} {
  return global as any
}

const g = getGlobal();
class DataBase {

  orm = g.__ORM__;

  entities = g.__ENTITIES__;

  init = async () => {
    if (this.orm) return;

    this.entities = g.__ENTITIES__ = entities;
    this.orm = g.__ORM__ = await MikroORM.init({
      validate: true,
      ensureIndexes: true,
      type: "mongo",
      clientUrl: rootConfig.MONGODB_URL,
      dbName: "blog",
      entities: Object.values(this.entities)
    });
  }

  getRepo<Entity> (target: EntityName<Entity>) {
    return this.orm.em.getRepository(target);
  }
}

export {
  DataBase
}