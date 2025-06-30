import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Function to get a Sequelize instance with default or custom configuration
export function getSequelizeInstance(config = {}) {
  return new Sequelize(
    config.database || process.env.MYSQL_DATABASE,
    config.user || process.env.MYSQL_USER,
    config.password || process.env.MYSQL_PASSWORD,
    {
      host: config.host || process.env.MYSQL_HOST,
      dialect: "mysql",
      logging: false,
      define: {
        timestamps: true,
        paranoid: true,
      },
      ...config.options, // allow custom Sequelize options
    }
  );
}