import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async createUser(user: CreateUserDto) {


        const existingUser = await this.prisma.user.findUnique({
            where: { username: user.username },
        });

        if (existingUser) {
            throw new ConflictException('Username already exists');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const userInfo = {
            ...user,
            password: hashedPassword
        }
        const createdUser = await this.prisma.user.create({
            data: userInfo
        })
        const { password, ...safeUser } = createdUser;
        return { user: safeUser }

    }
}
