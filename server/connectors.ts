import { createConnection, getConnection } from "typeorm";
import { rootConfig } from "../rootConfig";
import { Blog } from "../src/components/types";

createConnection({
  type: "mongodb",
  url: rootConfig.MONGODB_URL,
  database: "blog",
  entities: [
    Blog.FeaturedPost
  ],
  synchronize: true,
  logging: false
});

export { getConnection }