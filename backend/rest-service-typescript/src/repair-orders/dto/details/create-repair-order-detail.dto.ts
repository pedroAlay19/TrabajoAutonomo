import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateRepairOrderDetailDto {

  @ApiProperty({
    description: 'Repair order ID this detail belongs to.',
    example: 'c0cbe78e-8a26-4b91-a8f7-44baf820aa12',
    required: false
  })
  @IsUUID()
  @IsOptional()
  repairOrderId: string;

  @ApiProperty({
    description: 'The ID of the maintenance service performed.',
    example: 'ff98e41b-3e01-4a99-bd90-c2cc8513e213',
  })
  @IsUUID() 
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({
    description: 'The ID of the technician who performed this service.',
    example: 'bda2b7d1-c8d9-47a5-b6f1-47f5a98f52d7',
  })
  @IsUUID()
  @IsNotEmpty()
  technicianId: string;

  @ApiProperty({
    description: 'Service unit price.',
    example: 100.0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  unitPrice: number;

  @ApiProperty({
    description: 'Discount applied to the service (optional).',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty({
    description: 'Notes or additional comments.',
    example: 'Performed full diagnostic on motherboard.',
  })
  @IsNotEmpty()
  @IsString()
  notes: string;
}
