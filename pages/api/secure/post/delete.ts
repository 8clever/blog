import { NextApiRequest, NextApiResponse } from "next"
import { DataBase } from "../../../../server/connectors"
import type { ResponseError, ResponseSuccess } from "../../../../src/api"
import { ObjectId } from "@mikro-orm/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error("Only POST method available")
    }
  
    const db = new DataBase();
    await db.init();
    const dto: { id: string } = JSON.parse(req.body);
    const repo = db.getRepo(db.entities.Post);
    const post = await repo.findOne({ _id: new ObjectId(dto.id) });
    if (post) {
      await repo.removeAndFlush(post);
    }
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