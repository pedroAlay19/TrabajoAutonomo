import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EquipmentType } from '../entities/enums/equipment.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipmentDto {
  @ApiProperty({
    example: 'Laptop HP Pavilion',
    description: 'Equipment name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'LAPTOP',
    enum: EquipmentType,
    description: 'Type of equipment (e.g., LAPTOP, PRINTER, DESKTOP)'
  })
  @IsEnum(EquipmentType)
  type: EquipmentType;

  @ApiProperty({
    example: 'HP',
    description: 'Brand of the equipment',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    example: 'Pavilion 15',
    description: 'Model of the equipment',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    example: 'SN12345HP2025',
    description: 'Serial number of the equipment (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  serialNumber?: string;

  @ApiProperty({
    example: 'Laptop with overheating issues',
    description: 'Additional notes or observations (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  observations?: string;
}
