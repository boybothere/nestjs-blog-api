import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async createUser(user: CreateUserDto) {
        return await this.prisma.user.create({
            data: {
                ...user
            }
        })
    }
}
