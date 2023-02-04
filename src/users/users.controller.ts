import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { PlanetsService } from 'src/planets/planets.service';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    name: string;
}

@Controller('users')
export class UsersController {

    constructor(
        @Inject(UsersService) private userService: UsersService,
        @Inject(PlanetsService) private planetsService: PlanetsService
    ) { }

    @Get()
    index() {
        return this.userService.findAll();
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        const user = await this.userService.create(dto.name);
        await this.planetsService.createInitialPlanet(user);
        return user;
    }
}
