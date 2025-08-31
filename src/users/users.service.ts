import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService
    ) { }
    async createUser(user: CreateUserDto,) {


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



        return {
            user: {
                ...safeUser
            }
        }
    }

    generateToken(user: User): string {
        return sign(
            {
                id: user.id,
                username: user.username
            },
            this.configService.get<string>('JWT_SIGN_SECRET')
        )

    }

    async loginUser(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email }
        })

        if (!user) throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);

        const { password, ...existingUser } = user;

        const matchPassword = await bcrypt.compare(loginDto.password, password);
        if (!matchPassword) throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);

        return {
            user: {
                ...existingUser,
                token: this.generateToken(user)
            }
        }
    }

}
