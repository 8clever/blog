import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { rootConfig } from "../../rootConfig"

export const secureMiddleware = async (req: NextApiRequest) => {
  const session = await getToken({
    req,
    secret: rootConfig.SECRET
  })
  if (!session) return NextResponse.redirect("/signin")
}