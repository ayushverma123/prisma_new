import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Controller, Get, Post, Body, Put, Delete, Param, Query } from '@nestjs/common';
import { CreateEmployeesDto } from './createEmployees-dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('getbyid/:id')
  async getEmployeeById(@Param('id') id: string) {
    return this.employeesService.getEmployeeById(Number(id));
  }

  @Get('getall')
  async getAllEmployees() {
    return this.employeesService.getAllEmployees();
  }

  
  @Post('create')
  async createEmployee(@Body() employeeData: CreateEmployeesDto) {
    return this.employeesService.createEmployee(employeeData);
  }

  @UsePipes(new ValidationPipe())
  @Put('updatebyid/:id')
  async updateEmployee(@Param('id') id: string, @Body() employeeData: CreateEmployeesDto) {
    return this.employeesService.updateEmployee(Number(id), employeeData);
  }

  @Delete('deletebyid/:id')
  async deleteEmployee(@Param('id') id: string) {
    return this.employeesService.deleteEmployee(Number(id));
  }
}