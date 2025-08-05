import { Sequelize } from "sequelize";
import environment from "../env-config.js";
import Worker from "../models/worker.js";

export const sequelize = new Sequelize(environment.dbConntectionString);

export default sequelize;
