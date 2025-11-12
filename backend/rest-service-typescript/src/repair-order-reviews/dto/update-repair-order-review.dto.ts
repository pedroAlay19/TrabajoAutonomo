import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRepairOrderReviewDto } from './create-repair-order-review.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRepairOrderReviewDto extends PartialType(OmitType(CreateRepairOrderReviewDto, ['repairOrderId'])) {
  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}
