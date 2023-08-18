import { HotelManager } from "@prisma/client";
export interface HotelManagerInterfaceResponse {
  code: number;
  message: string;
  status: string;
  data: HotelManager;
} 