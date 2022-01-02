import { wrap } from "@mikro-orm/core";
import { NextApiRequest, NextApiResponse } from "next"
import { DataBase, Post } from "../../../server/connectors"
import { Blog } from "../../../src/components/types";
import { ResponseError, ResponseSuccess } from "../../../src/api"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error("Only POST method available")
    }
  
    const db = new DataBase();
    await db.init();
  
    const dto: Blog.Post = JSON.parse(req.body);
    const post = new Post();
    wrap(post).assign(dto);
  
    const repo = db.getRepo<Post>(Post)
    await repo.persistAndFlush(post);

    const response: ResponseSuccess<null> = {
      message:  "SUCCESS",
      data: null
    }
    res.json(response);
  } catch (e: any) {
    const response: ResponseError = {
      message: "ERROR",
      errors: [ e.message ]
    }
    res.status(400).json(response);
  }
}