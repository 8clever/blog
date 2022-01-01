import { NextApiRequest, NextApiResponse } from "next"
import { getConnection } from "../../../server/connectors"
import { PostEntity } from "../../../server/entities/Post"
import { Blog } from "../../../src/components/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ errors: [ "Only POST method allowed" ] })
    return
  }

  const post: Blog.Post = JSON.parse(req.body)
  const conn = getConnection();
  const repo = conn.getRepository(PostEntity);
  await repo.save(post);

  res.json({ message: "SUCCESS" });
}