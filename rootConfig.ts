
const { MONGODB_URL = "mongodb://localhost:27017", PORT = 3000 } = process.env;

export const rootConfig = {
  MONGODB_URL,
  PORT
}