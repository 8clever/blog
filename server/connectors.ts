import { MikroORM, EntityName, EntityManager, RequestContext } from "@mikro-orm/core";
import { rootConfig } from "../rootConfig";
import { Image } from "./entities/Image";
import { Post } from "./entities/Post";
class DataBase {

  em!: EntityManager;

  init = async () => {
    if (this.em) return;

    const em = RequestContext.getEntityManager();
    if (em) {
      this.em = em;
      return;
    }

    const orm = await MikroORM.init({
      type: "mongo",
      clientUrl: rootConfig.MONGODB_URL,
      dbName: "blog",
      entities: [
        Post,
        Image
      ]
    });

    this.em = orm.em;
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