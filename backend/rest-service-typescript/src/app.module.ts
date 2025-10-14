import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EquipmentModule } from './equipment/equipment.module';
import { ServicesModule } from './services/services.module';
import { InventoryModule } from './inventory/inventory.module';
import { TicketsModule } from './tickets/tickets.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Technician } from './users/entities/technician.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '1234',
      database: 'testdb',
      entities: [User, Technician],
      synchronize: true,
    }),
    AuthModule, UsersModule, EquipmentModule, ServicesModule, InventoryModule, TicketsModule, NotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}