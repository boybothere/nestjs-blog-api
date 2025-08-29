import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async createUser(user: CreateUserDto) {
        const newUser = new User();
        Object.assign(newUser, user);
        return await this.userRepository.save(newUser);
    }
}
