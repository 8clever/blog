import { NextApiRequest } from "next"
import { FactoryEndpoint } from "server/factory"
import { Unsplash } from "server/unsplash"

const endpoint = new FactoryEndpoint();
endpoint.method = "GET";
endpoint.main = async (req: NextApiRequest) => {
  const unsplash = new Unsplash();
  const { term, ...options } = req.query;
  return unsplash.searchPhotos(term as string, options);
}

export default endpoint.handler;