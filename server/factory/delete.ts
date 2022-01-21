import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "@mikro-orm/mongodb";
import { DataBase } from "../connectors";
import { EntityName } from "@mikro-orm/core";
import { FactoryEndpoint } from ".";

export class DeleteEndpoint<T> extends FactoryEndpoint {
  constructor (
    private entity: EntityName<T>
  ) {
    super()
  }

  async after (item: Awaited<T>) {}

  async main (req: NextApiRequest, res: NextApiResponse<any>) {
    const db = new DataBase();
    await db.init();
    const dto: { id: string } = JSON.parse(req.body);
    const item = await db.orm.em.findOne(this.entity, {
      _id: new ObjectId(dto.id)
    } as object);
    if (!item) return;

    await db.orm.em.removeAndFlush(item);
    this.after(item);
  }
}