import { ValidationPipe } from '@nestjs/common/pipes';
import { UsePipes } from '@nestjs/common/decorators';
import { HotelManagerQueryDto } from './getQuery-dto';
import { Controller, Get, Post, Body, Put, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { HotelManagerService } from './hotelManager.service';
import { CreateHotelManagerDto } from './createHotelManager-dto';
import { HotelManager as HotelManagerModel } from '@prisma/client';
import { HotelManagerInterfaceResponse } from './hotelmanager-interface';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('hotel-manager')
export class HotelManagerController {
  constructor(private readonly hotelManagerService: HotelManagerService) {}

  @Get('getbyid/:id')
  async getHotelManagerById(@Param('id') id: string): Promise<HotelManagerInterfaceResponse> {
    return this.hotelManagerService.getHotelManagerById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('getall')
  async getAllHotelManagers(): Promise<HotelManagerModel[]> {
    return this.hotelManagerService.getAllHotelManagers();
  }

  @Get('filter')
  async getWithEmailAndPublished(): Promise<HotelManagerModel[]> {
    return this.hotelManagerService.filterHotelManager();
  }

  
  @Get('allqueries')
  async getEmailwithPublishedQueries(@Query() queryDto: HotelManagerQueryDto): Promise<any> {
    return this.hotelManagerService.getHotelManagers(queryDto);
  }


  @Get('rawquery')
  async getAllHotelManagerss() {
    return this.hotelManagerService.getHotelManagersWithRawQuery();
  }
  
  @Get('filter1')
  async getWithEmailAndPublished1() {
    return this.hotelManagerService.filterHotelManager1();
  }

  /*
  @Get('groupbycount')
  async getWithgroupbyandcount() {
    return this.hotelManagerService.groupHotelManagersByAge();
  }
*/
  
 @Get('sorting')
  async getWithEmailAndPublishedSorting() {
    return this.hotelManagerService.sorting();
  }

   
 @Get('groupBy')
 async getWithEmailAndPublishedGroupBy() {
   return this.hotelManagerService.groupby();
 }

 @Get('aggregate')
 async getWithEmailAndPublishedAggregation() {
   return this.hotelManagerService.aggregate();
 }
 

  @Get('pagination')
  async getWithEmailAndPublishedPagination() {
    return this.hotelManagerService.FilterWithOfsetPagination();
  }
  
  @Post('create')
  async createHotelManager(@Body() hotelManagerData: CreateHotelManagerDto): Promise<HotelManagerInterfaceResponse> {
    return this.hotelManagerService.createHotelManager(hotelManagerData);
  }

  @UsePipes(new ValidationPipe())
  @Put('updatebyid/:id')
  async updateHotelManager(@Param('id') id: string, @Body() hotelManagerData: CreateHotelManagerDto): Promise<HotelManagerInterfaceResponse> {
    return this.hotelManagerService.updateHotelManager(Number(id), hotelManagerData);
  }

  @Delete('deletebyid/:id')
  async deleteHotelManager(@Param('id') id: string): Promise<HotelManagerInterfaceResponse> {
    return this.hotelManagerService.deleteHotelManager(Number(id));
  }
}