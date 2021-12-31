import { NextApiRequest, NextApiResponse } from "next"
import { getConnection } from "../../../server/connectors"
import { Blog } from "../../../src/components/types"
import { FeaturedPostEntity } from "../../../server/entities/FeaturedPost"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const post: Blog.FeaturedPost = JSON.parse(req.body)
  const conn = getConnection();
  const repo = conn.getRepository(FeaturedPostEntity);
  await repo.save(post);

  res.json({ message: "SUCCESS" });
}