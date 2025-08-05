import { Router } from "express";
import { WorkerController } from "../controllers/worker.controller.js";

const router = Router();
const controller = new WorkerController();

router.get("/total-salary", controller.getTotalSalary);
router.get("/workers-with-departments", controller.getWorkersWithDepartments);
router.get("/annual-salaries", controller.getAnnualSalaries);

export default router;
