import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { UserRole } from 'src/users/entities/enums/user-role.enum';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,

    private readonly userService: UsersService,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto, user: JwtPayload) {
    const userFound = await this.userService.findOne(user.sub);

    const equipment = this.equipmentRepository.create({
      ...createEquipmentDto,
      user: userFound,
    });
    return await this.equipmentRepository.save(equipment);
  }

  async findAll(user: JwtPayload) {
    if (user.role === UserRole.ADMIN) {
      return await this.equipmentRepository.find({
        relations: ['user', 'repairOrders'],
        order: { createdAt: 'DESC' },
      });
    }
    return await this.equipmentRepository.find({
      relations: ['repairOrders'],
      where: { user: { id: user.sub } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, user: JwtPayload) {
    const whereCondition =
      user.role === UserRole.ADMIN ? { id } : { id, user: { id: user.sub } };

    const equipment = await this.equipmentRepository.findOne({
      where: whereCondition,
      relations: ['user', 'repairOrders'],
    });
    if (!equipment)
      throw new NotFoundException(`Equipment with id ${id} not found`);
    return equipment;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto, user: JwtPayload) {
    const equipmentFound = await this.findOne(id, user);
    Object.assign(equipmentFound, updateEquipmentDto);
    return await this.equipmentRepository.save(equipmentFound);
  }

  async remove(id: string, user: JwtPayload) {
    const equipment = await this.findOne(id, user);
    await this.equipmentRepository.remove(equipment);
  }
}
