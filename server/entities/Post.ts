import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { OneToOne } from 'typeorm';
import { Blog } from '../../src/components/types';
import { Image } from './Image';

@Entity()
export class Post implements Blog.Post {

  @PrimaryKey()
  key!: string;

  @Property()
  title!: string
  
  @Property()
  description!: string;
  
  @Property()
  post!: string;
  
  @Property({ onCreate: () => new Date() })
  dateCreated!: string;

  @Property({ onUpdate: () => new Date() })
  dateUpdated!: string
  
  @OneToOne(() => Image)
  image!: Image
}