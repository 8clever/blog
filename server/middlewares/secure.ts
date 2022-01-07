import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

/** middlewares can access env only with direct access pattern */
export const secureMiddleware = async (req: NextApiRequest) => {
  const session = await getToken({
    req,
    secret: process.env.SECRET as string,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://")
  });
  console.log(process.env.SECRET);
  console.log(process.env.NEXTAUTH_URL);
  if (!session) return NextResponse.redirect("/signin")
}