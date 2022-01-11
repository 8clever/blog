import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Blog } from '../../src/components/types';
import { Image } from './Image';

@Entity()
export class Post implements Blog.Post {

  @PrimaryKey()
  _id: ObjectId = new ObjectId();

  @Property()
  @Unique()
  key!: string;

  @Property()
  title!: string
  
  @Property()
  description!: string;
  
  @Property()
  post!: string;
  
  @Property({ 
    onCreate: () => new Date().valueOf()
  })
  dateCreated!: number;

  @Property({ 
    onUpdate: () => new Date().valueOf(),
  })
  dateUpdated!: number
  
  @Property()
  image!: Image
}