import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Department from "./department.js";

class Worker extends Model {
  declare worker_id: number;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare hire_date: Date;
  declare salary: number;
  declare department_id: number;
}

Worker.init(
  {
    worker_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      field: "WORKER_ID",
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "FIRST_NAME",
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "LAST_NAME",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "EMAIL",
      unique: true,
    },
    hire_date: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "HIRE_DATE",
    },
    salary: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      field: "SALARY",
      validate: {
        min: 0,
      },
    },
    department_id: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: "DEPARTMENT_ID",
      references: {
        model: "DEPARTMENTS",
        key: "DEPARTMENT_ID",
      },
    },
  },
  {
    sequelize,
    modelName: "Worker",
    tableName: "WORKERS",
    timestamps: false,
  }
);

Worker.belongsTo(Department, {
  foreignKey: "department_id",
});
Department.hasMany(Worker, {
  foreignKey: "department_id",
});

export default Worker;
