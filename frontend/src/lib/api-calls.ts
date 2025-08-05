import { WorkerAnnualSalary, WorkerDepartment, WorkerSalary } from "@/types/workers";
import { keysToLowercase } from "./utils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTotalSalaries(): Promise<WorkerSalary[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/workers/total-salary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes = await response.json();
    if (response.ok) {
      return jsonRes.map(keysToLowercase<WorkerSalary>);
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
    });
    const jsonRes = await response.json();
    if (response.ok) {
      return jsonRes.map(keysToLowercase<WorkerDepartment>);
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
    });
    const jsonRes = await response.json();
    if (response.ok) {
      return jsonRes.map(keysToLowercase<WorkerAnnualSalary>);
    } else {
      throw new Error(jsonRes.success ? "Unknown error" : jsonRes.error.message);
    }
  } catch (error) {
    console.error("Error fetching workers with annual salaries:", error);
    return [];
  }
}
