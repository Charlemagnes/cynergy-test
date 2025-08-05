import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Department extends Model {
  declare department_id: number;
  declare department_name: string;
}

Department.init(
  {
    department_id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      field: "DEPARTMENT_ID",
    },
    department_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "DEPARTMENT_NAME",
    },
  },
  {
    sequelize,
    modelName: "Department",
    tableName: "DEPARTMENTS",
    timestamps: false,
  }
);

export default Department;
