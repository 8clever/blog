import { NextApiRequest, NextApiResponse } from "next";
import { Blog, WebSite } from "src/components/types";
import { DataBase } from "server/connectors";

export const container = (body: string) => {
  return (
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${body}
    </urlset> 
    `
  )
}

export const item = (path: string = "", changefreq: "hourly" | "weekly" | "daily" | "never") => {
  return (
    `
    <url>
      <loc>${WebSite.Domain + path}</loc>
      <changefreq>${changefreq}</changefreq>
    </url>
    `
  )
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const items: string[] = [
    item("", "daily")
  ];

  const db = new DataBase();
  await db.init();

  const repo = db.getRepo(DataBase.Entities.Post);
  const posts = await repo.find({}, {
    orderBy: {
      dateCreated: "DESC"
    }
  });

  posts.forEach(p => {
    items.push(
      item(Blog.Post.GetPostUrl(p), "never")
    )
  });

  res.setHeader("Content-type", "application/xml; charset=utf-8");
  res.send(
    container(
      items.join("")
    )
  );
}