import { createServer } from "http"
import next from "next"
import { parse } from "url"
import { rootConfig } from "../rootConfig"

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

async function bootstrap () {
  await app.prepare();

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true)
    handle(req, res, parsedUrl)
  });

  server.listen(rootConfig.PORT, () => {
    console.log('> Ready on http://localhost:3000')
  });
}

bootstrap();