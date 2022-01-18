import { NextApiRequest, NextApiResponse } from "next";
import { ResponseError, ResponseSuccess } from "src/api";

export class FactoryEndpoint {

  method: "POST" | "GET" = "POST"

  async main (req: NextApiRequest, res: NextApiResponse): Promise<any> {

  }

  handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method !== this.method) {
        throw new Error(`Only ${this.method} method available`)
      }
      const dto = await this.main(req, res);
      const response: ResponseSuccess<typeof dto> = {
        message:  "SUCCESS",
        data: dto
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
}