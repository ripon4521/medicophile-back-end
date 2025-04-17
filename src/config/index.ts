import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const DB_NAME = process.env.DATABASE_NAME;

if (!process.env.DATABASE_USER || !process.env.DATABASE_PASS) {
  throw new Error("DATABASE_USER or DATABASE_PASS is not defined");
}

if (!process.env.PORT) {
  throw new Error("PORT is not defined");
}

if (!DB_NAME) {
  throw new Error("DATABASE_NAME is not defined");
}

const port = process.env.PORT || "3000";

// Updated database URL with DB_NAME
const databaseUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.b1mistq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

export default {
  database_url: databaseUrl,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  stripe_private_key: process.env.STRIPE_PRIVATE_KEY,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  superAdminPassword: process.env.SUPER_ADMIN_PASS,
  accessSecret:process.env.JWT_SECRET,
  refreshSecret:process.env.JWT_REFRESH_SECRET,
  nodeEnv:process.env.NODE_ENV
};
