import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    private isConnected = false;

    async onModuleInit() {
        if (!this.isConnected) {
            await this.$connect();
            this.isConnected = true;
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.isConnected = false;
    }
}
