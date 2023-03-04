import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ImperatorsService } from './imperators.service';
import { PlanetsService } from '../planets/planets.service';
import { ApiProperty } from '@nestjs/swagger';
import { TechnologyType, TechnologyTypes } from '../planets/technology.entity';
import { ResearchJob } from 'src/planets/research-job.entity';

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

@Controller('imperators')
export class ImperatorsController {

    constructor(
        @Inject(ImperatorsService) private imperatorservice: ImperatorsService,
        @Inject(PlanetsService) private planetsService: PlanetsService
    ) { }

    @Get()
    index() {
        return this.imperatorservice.findAll();
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        const user = await this.imperatorservice.create(dto.name);
        await this.planetsService.createInitialPlanet(user);
        return user;
    }

    @Get('/:userId/planets')
    getPlanets(@Param('planetId') userId: number) {
        return this.planetsService.planets(userId);
    }    

    @Get('/:userId/tech')
    getTechnologies(@Param('userId') userId: number) {
        return this.planetsService.technologies(userId);
    }

    @Post('/:userId/tech')
    research(@Body() dto: ResearchTechnologyDto): Promise<ResearchJob> {
        return this.planetsService.researchTechnology(dto.planetId, dto.name);
    }    
}
