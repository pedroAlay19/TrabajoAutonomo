import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentDto } from './create-equipment.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EquipmentStatus } from '../entities/enums/equipment.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  @ApiPropertyOptional({
    example: EquipmentStatus.IN_REPAIR,
    enum: EquipmentStatus,
    description: 'Current repair status of the equipment',
  })
  @IsOptional()
  @IsEnum(EquipmentStatus)
  currentStatus?: EquipmentStatus;
}
