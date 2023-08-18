import { ConflictException } from '@nestjs/common';
import { CreateHotelManagerDto } from './createHotelManager-dto';
import { HotelManagerQueryDto } from './getQuery-dto';
import { HotelManager } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { HotelManagerInterfaceResponse } from './hotelmanager-interface';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

// Replace 'path/to/prisma.service' with the actual path to your Prisma service.

@Injectable()
export class HotelManagerService {
  constructor(private readonly prisma: PrismaService) { }

  async createHotelManager(hotelManagerData: CreateHotelManagerDto): Promise<HotelManagerInterfaceResponse> {
    try {
      const createdHotelManager = await this.prisma.hotelManager.create({
        data: hotelManagerData,
      });

      return {
        code: 201, // 201 indicates "Created" status
        message: 'Hotelmanager created successfully',
        status: 'success',
        data: createdHotelManager,
      };
    } catch (error) {
      // Handle any errors that occur during the creation process
      throw new Error('Failed to create HotelManager.');
    }
  }

  async createHotelManager1(hotelManagerData: CreateHotelManagerDto) {
    const existing = await this.prisma.hotelManager.findUnique({
      where: {
        email: hotelManagerData.email
      },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    return this.prisma.hotelManager.create({
      data: hotelManagerData,
    });
  }


  async filterHotelManager() {

    return this.prisma.hotelManager.findMany({
      where: {
        email: {
          endsWith: 'prisma.io',
        },
        emp_task: {
          some: {
            published: true,
          },
        },
      },
      include: {
        emp_task: {
          where: {
            published: true,
          },
        },
      }
    })
  }



  async filterHotelManager1() {

    return this.prisma.hotelManager.findMany({
      where: {
        OR: [
          {
            email: {
              endsWith: 'prisma.io',
            },
          },
          { email: { endsWith: 'gmail.com' } },
        ],
        NOT: {
          email: {
            endsWith: 'hotmail.com',
          },
        },
      },
      select: {
        email: true,
      },
    })

  }


  async sorting() {


    return await this.prisma.hotelManager.findMany({
      orderBy: [
        {
          name: 'desc',
        },
      ],
      include: {
        emp_task: {
          orderBy: {
            title: 'desc',
          },
          select: {
            title: true,
          },
        },
      },
    })

  }

  async FilterWithOfsetPagination() {

    return await this.prisma.hotelManager.findMany({
      skip: 1,
      take: 1,
      where: {
        email: {
          contains: 'gmail.com',
        },
      },
    })
  }

  async aggregate() {

    const aggregations = await this.prisma.hotelManager.aggregate({
      _avg: {
        age: true,
      },
      where: {
        email: {
          contains: 'prisma.io',
        },
      },
      orderBy: {
        age: 'asc',
      },
      take: 10,
    })

    console.log('Average age:' + aggregations._avg.age)


  }


  async groupby() {

    return await this.prisma.hotelManager.groupBy({
      by: ['name'],
    })

  }

  async getHotelManagers(queryDto: HotelManagerQueryDto): Promise<any> {
    const { search, sortBy, sortOrder, pageNumber, pageSize, skip, take } = queryDto;

    let query = this.prisma.hotelManager.findMany({
      where: ({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    })

    const result = await query;

    if (!search) {
      let query = await this.prisma.hotelManager.findMany({ where: {} })
      return query;
    }

    // Apply sorting if provided
    if (sortBy && sortOrder) {
      result.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return bValue > aValue ? 1 : -1;
        }
      });
    }

    // Apply pagination if provided
    if (pageNumber && pageSize) {
      const calculatedSkip = (pageNumber - 1) * pageSize;
      return result.slice(calculatedSkip, calculatedSkip + pageSize);
    }

    // Apply skip and take directly from queryDto if provided
    if (skip !== undefined && take !== undefined) {
      return result.slice(skip, skip + take);
    }

    return result;
  }


  async getHotelManagersWithRawQuery(): Promise<any> {

    const result = await this.prisma.$queryRaw`SELECT * FROM hotelManager`
    console.log(result);
  }


  async getHotelManagerById(id: number): Promise<HotelManagerInterfaceResponse> {
    try {
      const hotelManager = await this.prisma.hotelManager.findUnique({ where: { id } });
      if (!hotelManager) {
        throw new NotFoundException('Hotel Manager not found.');
      }
      return {
        code: 200,
        message: 'HotelManager found successfully',
        status: 'success',
        data: hotelManager
      };
    }
    catch (error) {
      // Handle any errors that occur during the creation process
      throw new Error('Failed to create HotelManager.');
    }
  }

  async getAllHotelManagers() {
    return this.prisma.hotelManager.findMany();
  }



  async updateHotelManager(id: number, hotelManagerData: CreateHotelManagerDto): Promise<HotelManagerInterfaceResponse> {
    // Here, you can add any additional business logic before updating the hotel manager in the database.
    try {
      const updatedHotelManager = await this.prisma.hotelManager.update({
        where: { id },
        data: hotelManagerData,
      });
      if (!updatedHotelManager) {
        throw new NotFoundException('Hotel Manager not found.');
      }
      return {
        code: 200,
        message: 'HotelManager updated successfully',
        status: 'success',
        data: updatedHotelManager
      };
    }


    catch (error) {
      // Handle any errors that occur during the creation process
      throw new Error('Failed to update Hotelmanager.');
    }
  }
  async deleteHotelManager(id: number): Promise<HotelManagerInterfaceResponse | null> {
    try{
    const deletedHotelManager = await this.prisma.hotelManager.delete({ where: { id } });
    if (!deletedHotelManager) {
      throw new NotFoundException('Hotel Manager not found.');
    }
    return {
      code: 200,
      message: 'HotelManager deleted successfully',
      status: 'success',
      data: deletedHotelManager
    };
  }

  catch (error) {
    // Handle any errors that occur during the creation process
    throw new Error('Failed to delete HotelManagers.');
  }
}
}