import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { ApiProperty } from '@nestjs/swagger';
import { StructureType, StructureTypes } from './structures.entity';
import { ShipType, ShipTypes } from './fleet.entity';
import { DefenseType, DefenseTypes } from './defense.entity';
import { StructureJob } from './structure-job';

export class BuildStructureDto {
    @ApiProperty({
        enum: StructureTypes,
    })
    name: StructureType;

    @ApiProperty()
    planetId: number;
}

export class BuildShipsDto {
    @ApiProperty({
        enum: ShipTypes,
    })
    name: ShipType;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    planetId: number;
}

export class BuildDefensesDto {
    @ApiProperty({
        enum: DefenseTypes,
    })
    name: DefenseType;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    planetId: number;
}

@Controller('planets')
export class PlanetsController {

    constructor(
        @Inject(PlanetsService) private planetsService: PlanetsService
    ) { }

    @Get('/:planetId/resources')
    getResources(@Param('planetId') planetId: number) {
        return this.planetsService.resources(planetId);
    }

    @Get('/:planetId/structures')
    getStructures(@Param('planetId') planetId: number) {
        return this.planetsService.structures(planetId);
    }

    @Post('/:planetId/structures')
    buildStructure(@Body() dto: BuildStructureDto): Promise<StructureJob> {
        //TODO: verify user
        if(!StructureTypes.includes(dto.name)) {
            throw new Error(`Unknown StructureType ${dto.name}`);
        }

        return this.planetsService.buildStructure(dto.planetId, dto.name);
    }

    @Get('/:planetId/ships')
    getShips(@Param('planetId') planetId: number) {
        return this.planetsService.ships(planetId);
    }

    @Post('/:planetId/ships')
    buildShips(@Body() dto: BuildShipsDto) {
        return this.planetsService.buildShips(dto.planetId, dto.name, dto.amount);
    }

    @Get('/:planetId/defenses')
    getDefenses(@Param('planetId') planetId: number) {
        return this.planetsService.defenses(planetId);
    }

    @Post('/:planetId/defenses')
    buildDefenses(@Body() dto: BuildDefensesDto) {
        return this.planetsService.buildDefenses(dto.planetId, dto.name, dto.amount);
    }
}
