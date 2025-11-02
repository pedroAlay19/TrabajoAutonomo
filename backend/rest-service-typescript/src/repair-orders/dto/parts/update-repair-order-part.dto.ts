import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateRepairOrderPartDto } from './create-repair-order-part.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateRepairOrderPartDto extends PartialType(OmitType(CreateRepairOrderPartDto, ['repairOrderId'])) {
  @ApiProperty({
    description: 'Unique ID of the part record being updated.',
    example: 'fc98b4cf-12ab-47f7-8e64-d1420a9c431a',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}