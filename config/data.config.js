// config/data.config.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || './database.sqlite', // Use a SQLite file for the database
});

export default sequelize;

