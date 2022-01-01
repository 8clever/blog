import { Column } from "typeorm";
import { Blog } from "../../src/components/types";

export class ImageEntity implements Blog.Image {
  @Column()
  label: string = "";
  
  @Column()
  url: string = "";
}