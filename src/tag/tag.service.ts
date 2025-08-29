import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        const tags = await this.prisma.tag.findMany();
        console.log('Fetched tags:', tags);
        return tags;
    }

}
