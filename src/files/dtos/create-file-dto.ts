import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsIn,
  IsNotEmpty,
} from 'class-validator';

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class CreateFileUploadDto {
  @IsString()
  @IsOptional()
  ip?: string;

  @IsString()
  @IsNotEmpty()
  originalName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'orderBy should not be empty if provided' })
  orderBy?: string;

  @IsEnum(OrderDirection)
  @IsOptional()
  @IsIn([OrderDirection.ASC, OrderDirection.DESC], {
    message: 'Order direction must be "asc" or "desc"',
  })
  order?: OrderDirection;

  @IsBoolean()
  @IsOptional()
  removeDuplicates?: boolean;

  @IsBoolean()
  @IsOptional()
  strictValidation?: boolean;
}
