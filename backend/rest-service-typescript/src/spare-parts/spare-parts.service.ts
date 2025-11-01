import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { CreateSparePartDto } from './dto/create-spare-part.dto';
import { UpdateSparePartDto } from './dto/update-spare-part.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SparePartsService {
  constructor(
    @InjectRepository(SparePart)
    private readonly sparePartRepository: Repository<SparePart>,

    private readonly http: HttpService,

  ) {}

  async create(createSparePartDto: CreateSparePartDto) {
    const sparePart = this.sparePartRepository.create(createSparePartDto);
    const result = await this.sparePartRepository.save(sparePart);

    try {
      await firstValueFrom(this.http.post('http://localhost:8081/notify', {
        type: 'spare_part',
        action: 'created',
        id: result.id,
      }),
    );
    console.log('Notification sent for spare part creation');
    } catch (error) {
      console.error('Failed to send notification for spare part creation', error);
    }

    return result;
  }

  async findAll() {
    return await this.sparePartRepository.find({
      relations: ['repairOrderParts'],
    });
  }

  async findOne(id: string) {
    const sparePart = await this.sparePartRepository.findOne({
      where: { id },
      relations: ['repairOrderParts'],
    });

    if (!sparePart) {
      throw new NotFoundException(`Spare part with id ${id} not found`);
    }

    return sparePart;
  }

  async update(id: string, updateSparePartDto: UpdateSparePartDto) {

    // Buscamos primero el registro original para comparar el stock
    const existingPart = await this.sparePartRepository.findOneBy({id});
    if (!existingPart) {
      throw new NotFoundException(`Spare part with id ${id} not found`);
    }

    // Guardamos el stock anterior
    const previousStock = existingPart.stock;


    
  // combina los nuevos valores con el registro existente
    const sparePart = await this.sparePartRepository.preload({
      id,
      ...updateSparePartDto,
    });

    if (!sparePart) {
      throw new NotFoundException(`Spare part with id ${id} not found`);
    }

    const updatePart = await this.sparePartRepository.save(sparePart);

    if (
      updateSparePartDto.stock !== undefined &&
      updateSparePartDto.stock !== previousStock
    ) {
      try {
        await firstValueFrom(
          this.http.post('http://localhost:8081/notify', {
            type: 'spare_part_stock',
            action: 'updated',
            id: updatePart.id,
            newStock: updateSparePartDto.stock
          }),
        );
        console.log(`WS: Stock actualizado para ${updatePart.id} → ${updatePart.stock}`);
      } catch (error) {
        console.error('Error al enviar notificación de actualización de stock', error);
      }
    }
    return updatePart;
  }

  async remove(id: string) {
    const sparePart = await this.sparePartRepository.findOneBy({ id });
    if (!sparePart) {
      throw new NotFoundException(`Spare part with id ${id} not found`);
    }

    await this.sparePartRepository.remove(sparePart);
  }

  // Decrementar el stock de un repuesto
  async decreaseStock(partId: string, quantity: number): Promise<void> {
    const part = await this.findOne(partId);
    if (part.stock < quantity) {
      throw new BadRequestException(
        `Low stock. Available: ${part.stock}, required: ${quantity}`,
      );
    }
    part.stock -= quantity;
    await this.sparePartRepository.save(part);
  }

  // Incrementar el stock de un repuesto
  async increaseStock(partId: string, quantity: number): Promise<void> {
    const part = await this.findOne(partId);
    part.stock += quantity;
    await this.sparePartRepository.save(part);
  }
}
