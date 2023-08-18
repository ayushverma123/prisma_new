import { Module } from "@nestjs/common";
import { HotelManagerController } from "./hotelManager.controller";
import { HotelManagerService } from "./hotelManager.service";
import { PrismaService } from "src/prisma.service";



@Module({
     controllers: [HotelManagerController],
     providers: [HotelManagerService, PrismaService]
})
export class HotelManagerModule { }