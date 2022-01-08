import { MikroORM, EntityName, EntityManager, RequestContext } from "@mikro-orm/core";
import { rootConfig } from "../rootConfig";
import { Image } from "./entities/Image";
import { Post } from "./entities/Post";

function getGlobal (): { __ORM__?: MikroORM } {
  return global as any
}

class DataBase {

  em!: EntityManager;

  init = async () => {
    if (this.em) return;

    const g = getGlobal();
    if (g.__ORM__) {
      this.em = g.__ORM__.em;
      return;
    }

    g.__ORM__ = await MikroORM.init({
      validate: true,
      ensureIndexes: true,
      type: "mongo",
      clientUrl: rootConfig.MONGODB_URL,
      dbName: "blog",
      entities: [
        Post,
        Image
      ]
    });

    this.em = g.__ORM__.em;
  }

  getRepo<Entity> (target: EntityName<Entity>) {
    return this.em.getRepository(target);
  }
}

export {
  DataBase,

  Image,
  Post
}