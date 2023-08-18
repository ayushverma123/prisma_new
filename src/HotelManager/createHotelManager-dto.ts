import { IsNumber, IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateHotelManagerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

}