import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Blog } from "../../src/components/types";

@Entity()
export class ImageEntity implements Blog.Image {
  @ObjectIdColumn()
  id: ObjectId = new ObjectId()

  @Column()
  label: string = "";
  
  @Column()
  url: string = "";
}