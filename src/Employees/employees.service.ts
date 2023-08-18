import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; // Replace 'path/to/prisma.service' with the actual path to your Prisma service.
import { CreateEmployeesDto } from './createEmployees-dto';
import { EmployeeInterfaceResponse } from './employees-interface';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) { }
  

  async createEmployee(employeeData: CreateEmployeesDto) {
    // Check if an employee with the same ID already exists
    try{
    const existingEmployee = await this.prisma.employees.findUnique({
      where:{id:employeeData.BossId}
    });
  
    if (existingEmployee) {
      throw new Error('Employee with the given ID already exists.');
    }
  
    // Continue with creating the employee if the ID is unique
    
      const createdEmployee = await this.prisma.employees.create({
        data: employeeData,
      });
  
      return {
        code: 201, // 201 indicates "Created" status
        message: 'Employee created successfully',
        status: 'success',
        data: createdEmployee,
      };
    } catch (error) {
      // Handle any errors that occur during the creation process
      console.error('Error creating employee:', error);
      throw new Error('Failed to create employee.');
    }
  }


  async getEmployeeById(id: number): Promise<EmployeeInterfaceResponse> {
    try {
      const employee = await this.prisma.employees.findUnique({ where: { id } });
      if (!employee) {
        throw new NotFoundException('Employee not found.');
      }
      return {
        code: 200,
        message: 'HotelManager found successfully',
        status: 'success',
        data: employee

      };
    }
    catch (error) {
      // Handle the specific CastError here
      if (error) {
        throw new NotFoundException('Invalid hotelManager ID');
      }

    }
  }


  async getAllEmployees() {
    return this.prisma.employees.findMany();
  }

  
  async updateEmployee(id: number, employeeData: CreateEmployeesDto): Promise<EmployeeInterfaceResponse> {
    // Here, you can add any additional business logic before updating the employee in the database.
    try {
      const updatedEmployee = await this.prisma.employees.update({
        where: { id },
        data: employeeData,
      });
      if (!updatedEmployee) {
        throw new NotFoundException('Employee not found.');
      }
      return {
        code: 200,
        message: 'HotelManager updated successfully',
        status: 'success',
        data: updatedEmployee

      };
    }
    catch (error) {
      // Handle the specific CastError here
      if (error) {
        throw new NotFoundException('Invalid hotelManager ID');
      }

    }
  }

  async deleteEmployee(id: number) {
    try {
      const deletedEmployee = await this.prisma.employees.delete({ where: { id } });
      if (!deletedEmployee) {
        throw new NotFoundException('Employee not found.');
      }
      return {
        code: 200,
        message: 'HotelManager delete successfully',
        status: 'success',
        data: deletedEmployee

      };

    }
    catch (error) {
      // Handle the specific CastError here
      if (error) {
        throw new NotFoundException('Invalid hotelManager ID');
      }

    }
  }

}