import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Blog } from '../../src/components/types';
import { Image } from './Image';

@Entity()
export class Post implements Blog.Post {

  @PrimaryKey()
  _id!: ObjectId;

  @Property({ unique: true })
  key!: string;

  @Property()
  title!: string
  
  @Property()
  description!: string;
  
  @Property()
  post!: string;
  
  @Property({ 
    onCreate: () => new Date(),
    serializer: (value: Date) => value?.toJSON()
  })
  dateCreated!: string;

  @Property({ 
    onUpdate: () => new Date(),
    serializer: (value: Date) => value?.toJSON()
  })
  dateUpdated!: string
  
  @Property()
  image!: Image
}