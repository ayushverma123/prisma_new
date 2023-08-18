import { Prisma } from "@prisma/client";
export class HotelManagerQueryDto {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    pageNumber?: number;
    pageSize?: number;
    skip?: number;
    take?: number;
  }