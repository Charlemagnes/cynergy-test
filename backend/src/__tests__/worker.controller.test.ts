import request from "supertest";
import express, { Router } from "express";
import { WorkerController } from "../controllers/worker.controller.js";
import { sequelize } from "../config/database.js";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

// Mock the sequelize query function
jest.mock("../config/database.ts", () => ({
  sequelize: {
    query: jest.fn(),
  },
}));

describe("Worker Controller Tests", () => {
  let app: express.Application;
  let mockQuery: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    app = express();
    const router = Router();
    const workerController = new WorkerController();

    // Set up routes
    router.get("/total-salary", workerController.getTotalSalary);
    router.get("/workers-with-departments", workerController.getWorkersWithDepartments);
    router.get("/annual-salaries", workerController.getAnnualSalaries);
    app.use("/api", router);

    // Reset mock for each test
    mockQuery = sequelize.query as ReturnType<typeof jest.spyOn>;
    mockQuery.mockClear();
  });

  describe("GET /api/total-salary", () => {
    it("should return total salary data successfully", async () => {
      const mockData = [
        { worker_id: 1, name: "John Doe", salary: 50000 },
        { worker_id: 2, name: "Jane Smith", salary: 60000 },
      ];
      mockQuery.mockResolvedValueOnce(mockData);

      const response = await request(app).get("/api/total-salary");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(mockQuery).toHaveBeenCalledWith("select * from TABLE(workers_pkg.get_workers)", expect.any(Object));
    });

    it("should handle errors appropriately", async () => {
      mockQuery.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app).get("/api/total-salary");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });

  describe("GET /api/workers-with-departments", () => {
    it("should return workers with departments data successfully", async () => {
      const mockData = [
        { worker_id: 1, name: "John Doe", department: "IT" },
        { worker_id: 2, name: "Jane Smith", department: "HR" },
      ];
      mockQuery.mockResolvedValueOnce(mockData);

      const response = await request(app).get("/api/workers-with-departments");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(mockQuery).toHaveBeenCalledWith(
        "select * from TABLE(workers_pkg.get_workers_with_departments)",
        expect.any(Object)
      );
    });

    it("should handle errors appropriately", async () => {
      mockQuery.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app).get("/api/workers-with-departments");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });

  describe("GET /api/annual-salaries", () => {
    it("should return annual salaries data successfully", async () => {
      const mockData = [
        { worker_id: 1, name: "John Doe", annual_salary: 60000 },
        { worker_id: 2, name: "Jane Smith", annual_salary: 72000 },
      ];
      mockQuery.mockResolvedValueOnce(mockData);

      const response = await request(app).get("/api/annual-salaries");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(mockQuery).toHaveBeenCalledWith(
        "select * from TABLE(workers_pkg.get_workers_annual_salary)",
        expect.any(Object)
      );
    });

    it("should handle errors appropriately", async () => {
      mockQuery.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app).get("/api/annual-salaries");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Internal server error" });
    });
  });
});
