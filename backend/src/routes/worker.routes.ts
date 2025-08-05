import { Router } from "express";
import { WorkerController } from "../controllers/worker.controller.js";

const router = Router();
const workers = new WorkerController();

router.get("/total-salary", workers.getTotalSalary);
router.get("/workers-with-departments", workers.getWorkersWithDepartments);
router.get("/annual-salaries", workers.getAnnualSalaries);

export default router;
