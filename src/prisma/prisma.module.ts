import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// optional, makes PrismaService available everywhere without importing
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }
