import { EntitySchema } from 'typeorm';

export const FeaturedPostEntity = new EntitySchema({
  name: "post",
  tableName: "posts",
  columns: {
    key: {
      primary: true,
      type: "string"
    },
    title: {
      type: "string"
    },
    description: {
      type: "text"
    },
    post: {
      type: "text"
    },
    dateCreated: {
      generated: true,
      type: "date"
    },
    image: {
      type: "json"
    }
  }
})