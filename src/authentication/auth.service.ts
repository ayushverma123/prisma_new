import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { HotelManagerService } from "src/HotelManager/hotelManager.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from "./dto/register-user.dto";


@Injectable()
export class AuthService{

     constructor(
          private readonly prismaService: PrismaService,
          private jwtService: JwtService,
          private readonly hotelManagerService: HotelManagerService){}

     
     async login(loginDto: LoginDto):Promise<any>{
          const {email} = loginDto;

          const users =await this.prismaService.hotelManager.findUnique({
               where: {email:loginDto.email}
          })

          if(!users){
               throw new NotFoundException('user not found')
          }
          
 /*
         const validatePassword = await bcrypt.compare(email,loginDto.email)

          if(!validatePassword){
               throw new NotFoundException('Invalid password')
          }
          */

          return {
               token: this.jwtService.sign({email})
          }
     }



}