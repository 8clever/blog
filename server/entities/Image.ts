import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Blog } from "src/components/types";

@Entity()
export class Image implements Blog.Image {

  @Property()
  label!: string;

  @Property()
  author!: string;
  
  @PrimaryKey()
  url!: string;
}