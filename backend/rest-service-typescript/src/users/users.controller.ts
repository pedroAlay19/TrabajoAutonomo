import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('technician')
  createTechnician(@Body() createTechnicianDto: CreateTechnicianDto) {
    return this.usersService.createTechnician(createTechnicianDto);
  }

  @Get()
  findUsers() {
    return this.usersService.findUsers();
  }

  @Get('technician')
  findTechnicians() {
    return this.usersService.findTechnicians();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Patch('technician/:id')
  updateTechnician(@Param('id') id: string, @Body() updateTechnicianDto: UpdateTechnicianDto) {
    return this.usersService.updateTechnician(id, updateTechnicianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
