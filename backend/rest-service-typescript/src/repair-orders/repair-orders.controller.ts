import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepairOrdersService } from './repair-orders.service';
import { CreateRepairOrderDto } from './dto/create-repair-order.dto';
import { UpdateRepairOrderDto } from './dto/update-repair-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Repair Orders')
@Controller('repair-orders')
export class RepairOrdersController {
  constructor(private readonly repairOrdersService: RepairOrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new repair order' })
  @ApiResponse({ status: 201, description: 'Repair order created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createRepairOrderDto: CreateRepairOrderDto) {
    return this.repairOrdersService.create(createRepairOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all repair orders' })
  @ApiResponse({ status: 200, description: 'List of all repair orders retrieved successfully.' })
  findAll() {
    return this.repairOrdersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a repair order by ID' })
  @ApiParam({ name: 'id', description: 'Repair order ID'})
  @ApiResponse({ status: 200, description: 'Repair order found.' })
  @ApiResponse({ status: 404, description: 'Repair order not found.' })
  findOne(@Param('id') id: string) {
    return this.repairOrdersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a repair order by ID' })
  @ApiParam({ name: 'id', description: 'Repair order ID' })
  @ApiResponse({ status: 200, description: 'Repair order updated successfully.' })
  @ApiResponse({ status: 404, description: 'Repair order not found.' })
  update(@Param('id') id: string, @Body() updateRepairOrderDto: UpdateRepairOrderDto) {
    return this.repairOrdersService.update(id, updateRepairOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a repair order by ID' })
  @ApiParam({ name: 'id', description: 'Repair order ID' })
  @ApiResponse({ status: 200, description: 'Repair order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Repair order not found.' })
  remove(@Param('id') id: string) {
    return this.repairOrdersService.remove(id);
  }
}
