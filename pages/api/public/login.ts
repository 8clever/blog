import { NextApiRequest, NextApiResponse } from "next"
import { rootConfig } from "../../../rootConfig";
import type { ResponseError, ResponseSuccess } from "../../../src/api";
import { User } from "../../../src/components/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error("Only POST method available")
    }

    const dto: User.Auth = JSON.parse(req.body);

    if (dto.password !== rootConfig.SECRET) {
      throw new Error("Invalid login/password");
    }

    delete dto.password;

    const response: ResponseSuccess<User.Auth> = {
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