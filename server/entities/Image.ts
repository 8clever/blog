import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Blog } from "../../src/components/types";

@Entity()
export class Image implements Blog.Image {

  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  label!: string;
  
  @Property()
  url!: string;
}