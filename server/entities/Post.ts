import { ObjectId } from 'mongodb';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, OneToOne } from 'typeorm';
import { Blog } from '../../src/components/types';
import { ImageEntity } from './Image';

@Entity()
export class PostEntity implements Blog.Post {

  @ObjectIdColumn()
  id: ObjectId = new ObjectId();

  @Column()
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
  
  @OneToOne(() => ImageEntity)
  image: ImageEntity = new ImageEntity()
}