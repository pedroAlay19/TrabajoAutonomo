import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairOrderReviewsService } from './repair-order-reviews.service';
import { CreateRepairOrderReviewDto } from './dto/create-repair-order-review.dto';
import { UpdateRepairOrderReviewDto } from './dto/update-repair-order-review.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Repair Order Reviews')
@Controller('repair-order-reviews')
export class RepairOrderReviewsController {
  constructor(private readonly repairOrderReviewsService: RepairOrderReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review for a repair order' })
  @ApiResponse({ status: 201, description: 'Review created successfully.' })
  create(@Body() createRepairOrderReviewDto: CreateRepairOrderReviewDto) {
    return this.repairOrderReviewsService.create(createRepairOrderReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all reviews' })
  @ApiResponse({ status: 200, description: 'List of all repair order reviews.' })
  findAll() {
    return this.repairOrderReviewsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific review by ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the review to retrieve',
    example: 'a9f8b0cc-6a10-44b5-ae92-13c4123b9b7d',
  })
  @ApiResponse({ status: 200, description: 'Review found.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  findOne(@Param('id') id: string) {
    return this.repairOrderReviewsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a repair order review' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the review to update',
    example: 'bcdde0d7-ec03-4b5d-86f2-3ef9b4a90f1c',
  })
  @ApiResponse({ status: 200, description: 'Review updated successfully.' })
  update(@Param('id') id: string, @Body() updateRepairOrderReviewDto: UpdateRepairOrderReviewDto) {
    return this.repairOrderReviewsService.update(id, updateRepairOrderReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the review to delete',
    example: 'b16a938f-6b0a-4e8d-bf34-34f1e3e8e7b1',
  })
  @ApiResponse({ status: 200, description: 'Review deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.repairOrderReviewsService.remove(id);
  }
}
