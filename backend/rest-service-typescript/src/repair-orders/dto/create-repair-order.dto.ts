import { IsUUID, IsOptional, IsNumber, IsString, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRepairOrderDetailDto } from './details/create-repair-order-detail.dto';
import { CreateRepairOrderPartDto } from './parts/create-repair-order-part.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRepairOrderDto {
  @ApiProperty({
    description: 'The ID of the equipment associated with this repair order.',
    example: 'a4b8b632-1df3-4c12-84e8-29ab8c1a22a1',
  })
  @IsNotEmpty()
  @IsUUID()
  equipmentId: string;

  @ApiProperty({
    description: 'Description of the problem reported by the client.',
    example: 'Laptop does not power on.',
  })
  @IsNotEmpty()
  @IsString()
  problemDescription: string;

  @ApiProperty({
    description: 'Initial technician diagnosis (optional).',
    example: 'Power circuit issue.',
    required: false,
  })
  @IsOptional()
  @IsString()
  diagnosis?: string;
 
  @ApiProperty({
    description: 'Estimated repair cost.',
    example: 150.5,
  })
  @IsNotEmpty()
  @IsNumber()
  estimatedCost: number;

  @ApiProperty({
    description: 'List of repair order details (services performed).',
    type: [CreateRepairOrderDetailDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRepairOrderDetailDto)
  details: CreateRepairOrderDetailDto[];

  @ApiProperty({
    description: 'List of parts used in the repair.',
    type: [CreateRepairOrderPartDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRepairOrderPartDto)
  parts: CreateRepairOrderPartDto[];

}
