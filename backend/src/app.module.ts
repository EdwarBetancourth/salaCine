import { Module } from '@nestjs/common';
import { RoutesModule } from './modules/routes/routes.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { CommonModule } from './modules/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'edwar',
      password: 'sa..123',
      database: 'salaCine',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    RoutesModule, 
    AuthModule, 
    ConfigModule, 
    CommonModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
