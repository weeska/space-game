import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { PlanetsService } from 'src/planets/planets.service';
import { ApiProperty } from '@nestjs/swagger';
import { TechnologyType, TechnologyTypes } from 'src/planets/technology.entity';

export class CreateUserDto {
    @ApiProperty({
        example: 'Imperator'
    })
    name: string;
}

export class ResearchTechnologyDto {
    @ApiProperty({
        enum: TechnologyTypes,
    })
    name: TechnologyType;

    @ApiProperty()
    planetId: number;
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

    @Get('/:userId/tech')
    getTechnologies(@Param('userId') userId: number) {
        return this.planetsService.technologies(userId);
    }

    @Post('/:userId/tech')
    research(@Body() dto: ResearchTechnologyDto) {
        return this.planetsService.researchTechnology(dto.planetId, dto.name);
    }    
}
