import { EmployeesModule } from './Employees/employee.module';
import { AuthModule } from './authentication/auth.module';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { HotelManagerService } from './HotelManager/hotelManager.service';
import { EmployeesService } from './Employees/employees.service';
import { HotelManagerController } from './HotelManager/hotelManager.controller';
import { EmployeesController } from './Employees/employees.controller';
import { HotelManagerModule } from './HotelManager/hotelManager.module';

@Module({
  imports: [AuthModule, HotelManagerModule, EmployeesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
