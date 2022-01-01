import { Column, Entity } from "typeorm";
import { Blog } from "../../src/components/types";

@Entity()
export class ImageEntity implements Blog.Image {
  
  @Column()
  label: string = "";
  
  @Column()
  url: string = "";
}