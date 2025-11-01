import { Module } from '@nestjs/common';
import { SparePartsService } from './spare-parts.service';
import { SparePartsController } from './spare-parts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './entities/spare-part.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([SparePart]), HttpModule],
  controllers: [SparePartsController],
  providers: [SparePartsService],
  exports: [SparePartsService]
})
export class SparePartsModule {}
