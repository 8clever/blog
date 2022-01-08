
const { 
  MONGODB_URL = "mongodb://localhost:27017", 
  PORT = 3000,
  SECRET = "123456",
  NEXTAUTH_URL = "http://localhost:" + PORT,
  UNSPLASH_ACCESS_TOKEN = ""
} = process.env;

export const rootConfig = {
  MONGODB_URL,
  PORT,
  SECRET,
  NEXTAUTH_URL,
  UNSPLASH_ACCESS_TOKEN
}