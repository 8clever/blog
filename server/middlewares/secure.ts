import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { rootConfig } from "rootConfig";

/** middlewares can access env only with direct access pattern */
export const secureMiddleware = async (req: NextApiRequest) => {
  const config = {
    req,
    secret: process.env.SECRET as string || rootConfig.SECRET,
    secureCookie: (process.env.NEXTAUTH_URL || rootConfig.NEXTAUTH_URL)?.startsWith("https://")
  }
  const session = await getToken(config);
  if (!session) return NextResponse.redirect("/signin")
}