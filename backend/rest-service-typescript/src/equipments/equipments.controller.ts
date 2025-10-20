import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Equipments')
@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Post()
    @ApiOperation({ summary: 'Create a new equipment for a registered user' })
    @ApiResponse({ status: 201, description: 'Equipment created successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid equipment data.' })
    create(@Body() createEquipmentDto: CreateEquipmentDto) {
      return this.equipmentsService.create(createEquipmentDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all equipment' })
    @ApiResponse({ status: 200, description: 'List of equipment retrieved successfully.' })
    findAll() {
      return this.equipmentsService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get equipment by ID' })
    @ApiParam({ name: 'id', description: 'Unique identifier of the equipment (UUID)', example: 'a4d8f3c2-7b3a-45f8-8b14-9f8b89e2ad12' })
    @ApiResponse({ status: 200, description: 'Equipment found.' })
    @ApiResponse({ status: 404, description: 'Equipment not found.' })
    findOne(@Param('id') id: string) {
      return this.equipmentsService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update equipment by ID' })
    @ApiParam({ name: 'id', description: 'Unique identifier of the equipment (UUID)', example: 'a4d8f3c2-7b3a-45f8-8b14-9f8b89e2ad12' })
    @ApiResponse({ status: 200, description: 'Equipment updated successfully.' })
    @ApiResponse({ status: 404, description: 'Equipment not found.' })
    update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
      return this.equipmentsService.update(id, updateEquipmentDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un equipo por ID' })
    @ApiParam({ name: 'id', description: 'Unique identifier of the equipment (UUID)', example: 'a4d8f3c2-7b3a-45f8-8b14-9f8b89e2ad12' })
    @ApiResponse({ status: 200, description: 'Equipment deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Equipment not found.' })
    remove(@Param('id') id: string) {
      return this.equipmentsService.remove(id);
    }
}
