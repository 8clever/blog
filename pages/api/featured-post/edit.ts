import { NextApiRequest, NextApiResponse } from "next"
import { DataBase } from "../../../server/connectors"
import { PostEntity } from "../../../server/entities/Post"
import { Blog } from "../../../src/components/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ errors: [ "Only POST method allowed" ] })
    return
  }

  const db = new DataBase();
  await db.init();

  const post: Blog.Post = JSON.parse(req.body)

  const repo = db.getRepo<PostEntity>(PostEntity.COLLECTION_NAME)

  await repo.save(post);

  res.json({ message: "SUCCESS" });
}