import { ObjectId } from 'mongodb';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Blog } from '../../src/components/types';
import { ImageEntity } from './Image';

const COLLECTION_NAME = "posts";

@Entity(COLLECTION_NAME)
export class PostEntity implements Blog.Post {

  public static COLLECTION_NAME = COLLECTION_NAME;

  @ObjectIdColumn()
  id: ObjectId = new ObjectId();

  @Column({ primary: true })
  key: string = "";

  @Column()
  title: string = ""
  
  @Column()
  description: string = "";
  
  @Column()
  post: string = "";
  
  @Column("date")
  @CreateDateColumn()
  dateCreated: string = "";

  @Column("date")
  @UpdateDateColumn()
  dateUpdated: string = ""
  
  @Column(() => ImageEntity)
  image: ImageEntity = new ImageEntity()
}