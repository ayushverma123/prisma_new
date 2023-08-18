import { Employees } from "@prisma/client";
export interface EmployeeInterfaceResponse {
  code: number;
  message: string;
  status: string;
  data: Employees;


}
