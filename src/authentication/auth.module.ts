import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { HotelManagerService } from 'src/HotelManager/hotelManager.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HotelManagerModule } from 'src/HotelManager/hotelManager.module';


@Module({
     controllers: [AuthController],
     providers:[AuthService, PrismaService,JwtStrategy,HotelManagerService],
     imports:[
          HotelManagerModule,
          PassportModule,
          JwtModule.register({
               secret: process.env.JWT_SECRET,
               signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN
               }
          })
     ]
})
export class AuthModule{}