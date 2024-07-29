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
  /* ordena los archivos segun los campos, ej: edad, nombre, apellido */

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
