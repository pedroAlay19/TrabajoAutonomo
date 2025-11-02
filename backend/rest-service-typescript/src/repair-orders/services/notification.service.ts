import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RepairOrderNotification } from '../entities/repair-order-notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepairStatus } from '../entities/enum/order-repair.enum';
import { RepairOrder } from '../entities/repair-order.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(RepairOrderNotification)
    private readonly notificationRepository: Repository<RepairOrderNotification>,
  ) {}

  async create(repairOrder: RepairOrder, status: OrderRepairStatus): Promise<RepairOrderNotification> {
  let title: string;
  let message: string;

  switch (status) {
    case OrderRepairStatus.OPEN:
      title = 'Repair Order Opened';
      message = 'A new repair order has been created.';
      break;

    case OrderRepairStatus.IN_PROGRESS:
      title = 'Repair In Progress';
      message = 'The repair order is currently being worked on.';
      break;

    case OrderRepairStatus.RESOLVED:
      title = 'Repair Order Resolved';
      message = 'The repair order has been successfully completed.';
      break;

    case OrderRepairStatus.CLOSED:
      title = 'Repair Order Closed';
      message = 'The repair order has been closed.';
      break;

    default:
      title = 'Repair Order Update';
      message = 'There has been an update to the repair order status.';
      break;
  }
    const notification = this.notificationRepository.create({
      repairOrder,
      title,
      message,
    });

    return await this.notificationRepository.save(notification);
  }
}
