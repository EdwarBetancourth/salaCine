import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from 'src/environments/environment';
import { User } from '../routes/user/entities/user.entity';
import { UserService } from '../routes/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: environment.secretOrKey,
      signOptions: { expiresIn: '8h' },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalGuard,
    JwtGuard,
    JwtStrategy, 
    LocalStrategy,
    UserService
  ]
})
export class AuthModule {}
