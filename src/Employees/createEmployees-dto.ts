import { IsString , IsNumber ,IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
export class CreateEmployeesDto {
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  @IsBoolean()
  published: boolean;

  @IsOptional()
  @IsNumber()
  BossId: number;

}