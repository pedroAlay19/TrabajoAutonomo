import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRepairOrderPartDto } from './create-repair-order-part.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateRepairOrderPartDto extends PartialType(CreateRepairOrderPartDto) {
  @ApiProperty({
    description: 'Unique ID of the part record being updated.',
    example: 'fc98b4cf-12ab-47f7-8e64-d1420a9c431a',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}