import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateRepairOrderDetailDto } from './create-repair-order-detail.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRepairOrderDetailDto extends PartialType(OmitType(CreateRepairOrderDetailDto, ['repairOrderId'])) {

  @ApiProperty({
    description: 'Image URL with visual evidence of the repair.',
    example: 'https://example.com/evidence/repair1.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'Unique ID of the detail being updated.',
    example: '9e9b4cf6-0ab7-4ff7-9b64-c2420a9c431f',
  })
  @IsUUID()
  id: string;
}
