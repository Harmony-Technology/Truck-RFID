import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
      PrismaModule,
      PassportModule,
      JwtModule.register({
        secret: process.env.SECRET || 'your_secret_key', // change 'your_secret_key' to your actual secret key
        signOptions: { expiresIn: '60m' },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
  })
  export class AuthModule {}
  