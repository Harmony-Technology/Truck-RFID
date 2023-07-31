import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InputsModule } from './inputs/inputs.module';
import { Prisma } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
// import { StreamController } from './stream/stream.controller';
@Module({
  imports: [],
  controllers: [AppController],//  StreamController
  providers: [AppService],
})
export class AppModule {}
