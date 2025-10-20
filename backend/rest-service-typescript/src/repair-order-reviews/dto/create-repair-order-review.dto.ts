import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateRepairOrderReviewDto {
  @ApiProperty({
    description: 'The UUID of the associated repair order.',
    example: 'b16a938f-6b0a-4e8d-bf34-34f1e3e8e7b1',
  })
  @IsUUID()
  @IsNotEmpty()
  repairOrderId: string;

  @ApiProperty({
    description: 'Rating given to the repair service (1 to 5).',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Comment or feedback from the client.',
    example: 'The service was excellent and fast!',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
