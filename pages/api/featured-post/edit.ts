import { NextApiRequest, NextApiResponse } from "next"
import { DataBase, Post, Image } from "../../../server/connectors"
import { Blog } from "../../../src/components/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ errors: [ "Only POST method allowed" ] })
    return
  }

  const db = new DataBase();
  await db.init();

  const dto: Blog.Post = JSON.parse(req.body);
  const post = new Post();
  Object.assign(post, dto);

  post.image = new Image();
  Object.assign(post.image, dto.image);

  const repo = db.getRepo<Post>(Post)

  await repo.persistAndFlush(post);

  res.json({ message: "SUCCESS" });
}