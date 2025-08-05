import { Request, Response } from "express";
import { sequelize } from "../config/database.js";
import { QueryTypes } from "sequelize";

export class WorkerController {
  async getTotalSalary(req: Request, res: Response) {
    try {
      const result = await sequelize.query(
        "select * from TABLE(workers_pkg.get_workers)",

        { type: QueryTypes.SELECT }
      );
      res.json(result);
    } catch (error) {
      console.error("Error getting total salary:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getWorkersWithDepartments(req: Request, res: Response) {
    try {
      const result = await sequelize.query("select * from TABLE(workers_pkg.get_workers_with_departments)", {
        type: QueryTypes.SELECT,
      });
      res.json(result);
    } catch (error) {
      console.error("Error getting workers with departments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAnnualSalaries(req: Request, res: Response) {
    try {
      const result = await sequelize.query("select * from TABLE(workers_pkg.get_workers_annual_salary)", {
        type: QueryTypes.SELECT,
      });
      res.json(result);
    } catch (error) {
      console.error("Error getting annual salaries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
