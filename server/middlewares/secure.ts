import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { rootConfig } from "../../rootConfig"

export const secureMiddleware = async (req: NextApiRequest) => {
  const session = await getToken({
    req,
    secret: rootConfig.SECRET,
    secureCookie: rootConfig.NEXTAUTH_URL?.startsWith("https://")
  })
  if (!session) return NextResponse.redirect("/signin")
}