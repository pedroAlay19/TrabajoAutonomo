import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UpdateRepairOrderDetailDto } from './details/update-repair-order-detail';
import { OrderRepairStatus } from '../entities/enum/order-repair.enum';
import { UpdateRepairOrderPartDto } from './parts/update-repair-order-part.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRepairOrderDto {
  @ApiProperty({
    description: 'Equipment ID (optional).',
    example: 'b16d2a1f-6d7c-4f22-91d3-d2b830b3d94b',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  equipmentId?: string;

  @ApiProperty({
    description: 'Updated problem description.',
    example: 'Laptop randomly restarts when charging.',
    required: false,
  })
  @IsOptional()
  @IsString()
  problemDescription?: string;

  @ApiProperty({
    description: 'Updated diagnosis after inspection.',
    example: 'Faulty charging IC replaced.',
    required: false,
  })
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiProperty({
    description: 'Revised estimated cost.',
    example: 220.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  estimatedCost?: number;

  @ApiProperty({
    description: 'Updated list of service details.',
    type: [UpdateRepairOrderDetailDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRepairOrderDetailDto)
  details?: UpdateRepairOrderDetailDto[];

  @ApiProperty({
    description: 'Updated list of parts used.',
    type: [UpdateRepairOrderPartDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRepairOrderPartDto)
  parts?: UpdateRepairOrderPartDto[];

  @ApiProperty({
    description: 'Warranty start date (ISO format).',
    example: '2025-10-20',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  warrantyStartDate?: Date;

  @ApiProperty({
    description: 'Warranty end date (ISO format).',
    example: '2026-10-20',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  warrantyEndDate?: Date;

  @ApiProperty({
    description: 'Repair order current status.',
    enum: OrderRepairStatus,
    example: OrderRepairStatus.RESOLVED,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderRepairStatus)
  status?: OrderRepairStatus;
}
