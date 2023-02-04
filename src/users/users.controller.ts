import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';

export interface CreateUserDto {
    name: string;
}

@Controller('users')
export class UsersController {

    constructor(@Inject(UsersService) private userService: UsersService) { }

    @Get()
    index() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto.name);
    }
}
