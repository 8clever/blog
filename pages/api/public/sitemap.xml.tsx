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

export const item = (
  path: string = "", 
  lastmod: Date
) => {
  return (
    `
    <url>
      <loc>${WebSite.Domain + path}</loc>
      <lastmod>${lastmod.toJSON()}</lastmod>
    </url>
    `
  )
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  

  const db = new DataBase();
  await db.init();

  const posts = await db.em.aggregate(DataBase.Entities.Post, [
    {
      $addFields: {
        date: {
          $cond: [
            "$dateUpdated",
            "$dateUpdated",
            "$dateCreated"
          ]
        }
      }
    },
    {
      $sort: {
        date: -1,
      }
    },
    {
      $project: {
        key: 1,
        date: 1
      }
    }
  ]);

  const items: string[] = [
    item("", new Date(posts[0].date))
  ];

  posts.forEach((p: Blog.Post & { date: string }) => {
    items.push(
      item(Blog.Post.GetPostUrl(p), new Date(p.date))
    )
  });

  res.setHeader("Content-type", "application/xml; charset=utf-8");
  res.send(
    container(
      items.join("")
    )
  );
}