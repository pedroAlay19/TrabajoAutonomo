import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRepairOrderReviewDto } from './create-repair-order-review.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRepairOrderReviewDto extends PartialType(CreateRepairOrderReviewDto) {
  @ApiPropertyOptional({
    description: 'Indicates whether the review is visible to other users.',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}
