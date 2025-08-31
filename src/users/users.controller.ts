import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async loginUser(@Body('user') loginDto: LoginDto) {
        return await this.usersService.loginUser(loginDto);
    }
}
