import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceServicesModule } from './maintenance-services/maintenance-services.module';
import { SparePartsModule } from './spare-parts/spare-parts.module';
import { RepairOrdersModule } from './repair-orders/repair-orders.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { RepairOrderReviewsModule } from './repair-order-reviews/repair-order-reviews.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace las variables disponibles en toda la app
    }),
     // JWT Module con el mismo secret
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
    }),
    
    // Cache con Redis compartido
    CacheModule.register(redisConfig),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    EquipmentsModule,
    MaintenanceServicesModule,
    SparePartsModule,
    RepairOrdersModule,
    EquipmentsModule,
    RepairOrderReviewsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
