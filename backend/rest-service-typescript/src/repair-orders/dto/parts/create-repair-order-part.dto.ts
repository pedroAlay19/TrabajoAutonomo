import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateRepairOrderPartDto {
  @ApiProperty({
    description: 'The ID of the repair order this part belongs to.',
    example: 'c0cbe78e-8a26-4b91-a8f7-44baf820aa12',
    required: false
  })
  @IsUUID()
  @IsOptional()
  repairOrderId: string;

  @ApiProperty({
    description: 'The ID of the part used.',
    example: 'c0cbe78e-8a26-4b91-a8f7-44baf820aa12',
  })
  @IsUUID()
  partId: string;

  @ApiProperty({
    description: 'Quantity of parts used.',
    example: 2,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Optional image URL showing the part or evidence.',
    example: 'https://example.com/parts/img123.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imgUrl?: string;
}
