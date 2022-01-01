import { ObjectId } from 'mongodb';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';
import { Blog } from '../../src/components/types';
import { ImageEntity } from './Image';

@Entity()
export class PostEntity implements Blog.Post {

  @ObjectIdColumn()
  id: ObjectId = new ObjectId();

  @Column()
  key = "";

  @Column()
  title = ""
  
  @Column()
  description = "";
  
  @Column()
  post = "";
  
  @Column("date")
  @CreateDateColumn()
  dateCreated = "";

  @Column("date")
  @UpdateDateColumn()
  dateUpdated = ""
  
  @Column(type => ImageEntity)
  image: ImageEntity = new ImageEntity()
}