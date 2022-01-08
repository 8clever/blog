import { NextApiRequest, NextApiResponse } from "next"
import { Unsplash } from "../../../../server/unsplash"
import type { ResponseError, ResponseSuccess } from "../../../../src/api"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      throw new Error("Only GET method available")
    }
  
    const unsplash = new Unsplash();
    const images = await unsplash.searchPhotos(req.query.term as string);

    const response: ResponseSuccess<typeof images> = {
      message:  "SUCCESS",
      data: images
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