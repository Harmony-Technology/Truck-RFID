import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://root:@127.0.0.1:3306/truck', //link url of backendStarWears
        },
      },
    });
  }
  async onModuleDestroy() {
    await this.$connect; //await this.connect
  }
  async onModuleInit() {
    this.$disconnect;   //await this.diconnect
  }
}