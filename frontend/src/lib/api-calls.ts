import { WorkerAnnualSalary, WorkerDepartment, WorkerSalary } from "@/types/workers";
import { keysToLowercase } from "./utils";

const API_BASE_URL = process.env.API_BASE_URL;

export async function getTotalSalaries(): Promise<WorkerSalary[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/workers/total-salary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const jsonRes = await response.json();
    if (jsonRes.ok && jsonRes.success) {
      return keysToLowercase<WorkerSalary[]>(jsonRes.data);
    } else {
      throw new Error(jsonRes.success ? "Unknown error" : jsonRes.error.message);
    }
  } catch (error) {
    console.error("Error fetching workers with total salaries:", error);
    return [];
  }
}

export async function getWorkersWithDepartments(): Promise<WorkerDepartment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/workers/workers-with-departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const jsonRes = await response.json();
    if (jsonRes.ok && jsonRes.success) {
      return keysToLowercase<WorkerDepartment[]>(jsonRes.data);
    } else {
      throw new Error(jsonRes.success ? "Unknown error" : jsonRes.error.message);
    }
  } catch (error) {
    console.error("Error fetching workers with departments:", error);
    return [];
  }
}

export async function getAnnualSalaries(): Promise<WorkerAnnualSalary[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/workers/annual-salaries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const jsonRes = await response.json();
    if (jsonRes.ok && jsonRes.success) {
      return keysToLowercase<WorkerAnnualSalary[]>(jsonRes.data);
    } else {
      throw new Error(jsonRes.success ? "Unknown error" : jsonRes.error.message);
    }
  } catch (error) {
    console.error("Error fetching workers with annual salaries:", error);
    return [];
  }
}
